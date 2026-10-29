import 'server-only';

import { z } from 'zod';

const databaseEnvSchema = z.object({
  DATABASE_URL: z
    .url('올바른 PostgreSQL 연결 주소를 입력해 주세요.')
    .refine(
      (value) => ['postgres:', 'postgresql:'].includes(new URL(value).protocol),
      'postgres:// 또는 postgresql://로 시작하는 연결 주소를 입력해 주세요.',
    ),
});

export function getDatabaseEnv() {
  const result = databaseEnvSchema.safeParse({
    DATABASE_URL: process.env.DATABASE_URL,
  });

  if (!result.success) {
    throw new Error(
      '.env 파일의 DATABASE_URL에 실제 Supabase PostgreSQL 연결 주소를 입력한 뒤 서버를 재시작해 주세요.',
    );
  }

  return result.data;
}
