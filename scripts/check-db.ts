import { execFile } from 'node:child_process';
import { X509Certificate } from 'node:crypto';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import { config } from 'dotenv';
import { Client } from 'pg';
import { createDatabaseConnectionConfig } from '../src/lib/database-tls';
import { getPrismaDatasourceUrl } from '../src/lib/prisma-tls';
import { readSupabaseCa } from '../src/lib/supabase-ca';

type CheckResult = { ok: boolean; message: string };

const execute = promisify(execFile);
const requireFromProject = createRequire(resolve('package.json'));

config({ path: '.env.local', quiet: true });
config({ quiet: true });

function describeFailure(error: unknown): string {
  // Driver and CLI messages can contain credentials, hosts or schema details.
  // Classify them internally and only return fixed, safe descriptions.
  const detail = error as {
    code?: unknown;
    message?: unknown;
    stdout?: unknown;
    stderr?: unknown;
    killed?: unknown;
  } | null;
  const text = [detail?.code, detail?.message, detail?.stdout, detail?.stderr]
    .filter((value): value is string => typeof value === 'string')
    .join('\n');

  if (/P1000|28P01|password authentication failed/i.test(text)) {
    return 'DB 비밀번호와 비밀번호 부분의 URL 인코딩을 확인하세요.';
  }
  if (/certificate|TLS|SSL|CERT_/i.test(text)) {
    return '공식 CA 인증서의 내용·유효기간과 연결 주소를 확인하세요. TLS 검증은 끄지 마세요.';
  }
  if (/P1001|ENOTFOUND|EAI_AGAIN|ECONN|ETIMEDOUT/i.test(text)) {
    return '프로젝트 상태, 연결 주소, 네트워크와 방화벽을 확인하세요.';
  }
  if (detail?.killed || /timeout|timed out/i.test(text)) {
    return '응답 시간이 초과되었습니다. 네트워크와 DB 상태를 확인하세요.';
  }
  return '연결 주소·권한·인증서 설정을 확인하세요. 자세한 절차는 docs/SUPABASE_SETUP.md를 참고하세요.';
}

async function checkApplication(): Promise<CheckResult> {
  const url = process.env.DATABASE_URL;
  if (!url) return { ok: false, message: 'DATABASE_URL을 설정하세요.' };

  let client: Client | undefined;
  try {
    client = new Client({
      ...createDatabaseConnectionConfig(url),
      statement_timeout: 10_000,
      query_timeout: 10_000,
    });
    await client.connect();
    const result = await client.query<{ connection_test: number }>(
      'SELECT 1 AS connection_test',
    );
    if (result.rows[0]?.connection_test !== 1) {
      return { ok: false, message: 'SELECT 1의 결과가 예상과 다릅니다.' };
    }
    return { ok: true, message: 'TLS 인증서 검증과 SELECT 1 조회 성공' };
  } catch (error) {
    return { ok: false, message: describeFailure(error) };
  } finally {
    if (client) {
      await client.end().catch(() => {
        console.error('점검용 앱 DB 연결을 종료하지 못했습니다.');
        process.exitCode = 1;
      });
    }
  }
}

async function checkPrisma(): Promise<CheckResult> {
  if (!process.env.DIRECT_URL) {
    return { ok: false, message: 'DIRECT_URL을 설정하세요.' };
  }
  try {
    getPrismaDatasourceUrl(process.env.DIRECT_URL);
  } catch {
    return {
      ok: false,
      message:
        'DIRECT_URL의 Direct 또는 Session pooler 주소와 CA 파일을 확인하세요.',
    };
  }

  try {
    // --print reads schema metadata without writing schema.prisma or changing DB.
    // Resolve the installed CLI so no shell, download or OS-specific binary is needed.
    await execute(
      process.execPath,
      [
        requireFromProject.resolve('prisma/build/index.js'),
        'db',
        'pull',
        '--print',
      ],
      { timeout: 30_000, maxBuffer: 4 * 1024 * 1024, windowsHide: true },
    );
    return {
      ok: true,
      message: 'Prisma CLI 접속과 읽기 전용 스키마 조회 성공',
    };
  } catch (error) {
    const detail = error as { stdout?: string; stderr?: string };
    // An empty database is expected before the first migration.
    if (/\bP4001\b/.test(`${detail.stdout ?? ''}\n${detail.stderr ?? ''}`)) {
      return { ok: true, message: 'Prisma CLI 접속 성공 (조회할 테이블 없음)' };
    }
    return { ok: false, message: describeFailure(error) };
  }
}

async function main() {
  try {
    const certificate = new X509Certificate(readSupabaseCa());
    if (
      !certificate.ca ||
      Date.now() < Date.parse(certificate.validFrom) ||
      Date.now() >= Date.parse(certificate.validTo)
    ) {
      throw new Error('Invalid CA');
    }
  } catch {
    console.error(
      'certs/supabase-ca.crt의 공개 CA 형식·위치·유효기간을 확인하세요.',
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    'DB 읽기 전용 연결 점검을 시작합니다. 비밀값은 출력하지 않습니다.',
  );
  const results = [
    ['DATABASE_URL', await checkApplication()],
    ['DIRECT_URL', await checkPrisma()],
  ] as const;

  for (const [name, result] of results) {
    console.log(`${result.ok ? '성공' : '실패'} · ${name}: ${result.message}`);
  }
  if (results.some(([, result]) => !result.ok)) process.exitCode = 1;
  console.log('테이블·데이터·마이그레이션·스키마 파일은 변경하지 않았습니다.');
}

main().catch(() => {
  console.error(
    '점검 실행에 실패했습니다. 설치 상태와 프로젝트 폴더를 확인하세요.',
  );
  process.exitCode = 1;
});
