import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Run Next.js and Prisma commands from the project folder.
export function getSupabaseCaPath(): string {
  return join(process.cwd(), 'certs', 'supabase-ca.crt');
}

export function readSupabaseCa(): string {
  try {
    return readFileSync(getSupabaseCaPath(), 'utf8');
  } catch (cause) {
    throw new Error(
      'certs/supabase-ca.crt를 읽을 수 없습니다. 공식 CA 인증서 파일과 배포 포함 여부를 확인해 주세요.',
      { cause },
    );
  }
}
