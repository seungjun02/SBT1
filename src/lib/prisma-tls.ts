import { normalizeDatabaseUrl } from './database-tls';
import { relayThroughVerifiedTls } from './prisma-tls-relay';
import { getSupabaseCaPath, readSupabaseCa } from './supabase-ca';

export function getPrismaDatasourceUrl(
  connectionString: string | undefined,
  variable: 'DIRECT_URL' | 'SHADOW_DATABASE_URL' = 'DIRECT_URL',
): string {
  // Generation and builds must still work without database credentials.
  if (!connectionString) return '';

  const url = normalizeDatabaseUrl(connectionString, variable);
  if (url.hostname.endsWith('.pooler.supabase.com') && url.port === '6543') {
    throw new Error(
      `${variable}에는 Transaction pooler가 아닌 Direct 또는 Session pooler 주소를 입력해 주세요.`,
    );
  }

  // Prisma's native migration engine does not use node-postgres ssl options.
  readSupabaseCa();
  url.searchParams.set('sslmode', 'require');
  url.searchParams.set('sslaccept', 'strict');
  url.searchParams.set('sslcert', getSupabaseCaPath().replaceAll('\\', '/'));
  return url.toString();
}

// Prisma CLI only (prisma.config.ts). On macOS the CLI connects through the
// verified local relay in prisma-tls-relay.ts.
export function getPrismaCliUrl(
  connectionString: string | undefined,
  variable: 'DIRECT_URL' | 'SHADOW_DATABASE_URL' = 'DIRECT_URL',
): string {
  const url = getPrismaDatasourceUrl(connectionString, variable);
  return url && process.platform === 'darwin'
    ? relayThroughVerifiedTls(url)
    : url;
}
