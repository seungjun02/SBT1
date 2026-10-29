import type { PoolConfig } from 'pg';
import { readSupabaseCa } from './supabase-ca';

type DatabaseVariable = 'DATABASE_URL' | 'DIRECT_URL' | 'SHADOW_DATABASE_URL';

export function normalizeDatabaseUrl(
  connectionString: string,
  variable: DatabaseVariable = 'DATABASE_URL',
): URL {
  let url: URL;
  try {
    url = new URL(connectionString);
  } catch {
    throw new Error(
      `${variable}에 올바른 PostgreSQL 연결 주소를 입력해 주세요.`,
    );
  }
  if (!['postgres:', 'postgresql:'].includes(url.protocol)) {
    throw new Error(`${variable}은 PostgreSQL 연결 주소여야 합니다.`);
  }

  // URL options must never replace the CA or disable hostname verification.
  for (const key of [...url.searchParams.keys()]) {
    const normalized = key.toLowerCase();
    if (normalized.startsWith('ssl') || normalized === 'uselibpqcompat') {
      url.searchParams.delete(key);
    }
  }
  return url;
}

export function createDatabaseConnectionConfig(
  connectionString: string,
): PoolConfig {
  return {
    connectionString: normalizeDatabaseUrl(connectionString).toString(),
    ssl: {
      ca: readSupabaseCa(),
      rejectUnauthorized: true,
      minVersion: 'TLSv1.2',
    },
    max: 2,
    connectionTimeoutMillis: 5_000,
    idleTimeoutMillis: 10_000,
  };
}
