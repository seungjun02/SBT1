import { mkdtempSync, rmSync } from 'node:fs';
import { connect, createServer, isIP } from 'node:net';
import { join } from 'node:path';
import { connect as connectTls, type TLSSocket } from 'node:tls';
import { readSupabaseCa } from './supabase-ca';

// PostgreSQL SSLRequest message: length 8, request code 80877103.
const SSL_REQUEST = Buffer.from([0, 0, 0, 8, 4, 210, 22, 47]);

/**
 * macOS only. Prisma's migration engine checks TLS with the macOS certificate
 * policy, which rejects the Supabase pooler certificate (no extended key usage,
 * five-year validity) even with the correct CA. Node.js verifies the same
 * certificate against certs/supabase-ca.crt and the host name, so Prisma CLI
 * connects to a private local socket and this relay opens the verified TLS
 * connection. The relay exists only while the Prisma command runs.
 */
export function relayThroughVerifiedTls(datasourceUrl: string): string {
  const target = new URL(datasourceUrl);
  const host = target.hostname;
  const port = Number(target.port || '5432');
  const ca = readSupabaseCa();

  // mkdtemp creates the folder with mode 0700: only this user can connect.
  const folder = mkdtempSync('/tmp/prisma-tls-');
  process.once('exit', () => rmSync(folder, { recursive: true, force: true }));

  const server = createServer((client) => {
    client.pause();
    const upstream = connect({ host, port });
    let secure: TLSSocket | undefined;
    let verified = false;
    let closed = false;
    const close = (message?: string) => {
      if (closed) return;
      closed = true;
      if (message) console.error(`[Prisma TLS] ${message}`);
      client.destroy();
      secure?.destroy();
      upstream.destroy();
    };
    const code = (error: NodeJS.ErrnoException) => error.code ?? 'ERROR';

    client.on('error', () => close());
    client.on('close', () => close());
    upstream.on('error', (error: NodeJS.ErrnoException) =>
      close(
        verified
          ? undefined
          : `DIRECT_URL 서버에 연결하지 못했습니다(${code(error)}).`,
      ),
    );
    // Closed before the TLS request was answered (no reply and no error).
    upstream.once('close', () => {
      if (!secure) close('DIRECT_URL 서버가 응답 없이 연결을 끊었습니다.');
    });
    upstream.once('connect', () => upstream.write(SSL_REQUEST));
    upstream.once('data', (reply) => {
      // Only 'S' may arrive before TLS starts; anything else is refused.
      if (reply.length !== 1 || reply[0] !== 0x53) {
        close('DIRECT_URL 서버가 TLS 연결을 받지 않습니다.');
        return;
      }
      let tls: TLSSocket;
      try {
        // The certificate must match this host; SNI cannot carry an IP address.
        tls = connectTls({
          socket: upstream,
          host,
          servername: isIP(host) ? undefined : host,
          ca,
          minVersion: 'TLSv1.2',
          // Always verify, even when NODE_TLS_REJECT_UNAUTHORIZED=0 is set.
          rejectUnauthorized: true,
        });
      } catch (error) {
        close(`TLS 연결을 시작하지 못했습니다(${code(error as Error)}).`);
        return;
      }
      secure = tls;
      tls.on('error', (error: NodeJS.ErrnoException) =>
        close(
          verified
            ? undefined
            : `TLS 인증서 검증 실패(${code(error)}): certs/supabase-ca.crt와 DIRECT_URL 주소를 확인하세요. TLS 검증은 끄지 마세요.`,
        ),
      );
      tls.once('secureConnect', () => {
        verified = true;
        client.pipe(tls);
        tls.pipe(client);
        client.resume();
      });
    });
  });
  server.listen(join(folder, `.s.PGSQL.${port}`));
  server.unref();

  // Prisma speaks plain PostgreSQL only to the private socket above.
  const local = new URL(datasourceUrl);
  local.hostname = 'localhost';
  for (const key of [...local.searchParams.keys()]) {
    if (key.toLowerCase().startsWith('ssl')) local.searchParams.delete(key);
  }
  local.searchParams.set('host', folder);
  local.searchParams.set('sslmode', 'disable');
  return local.toString();
}
