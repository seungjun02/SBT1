import 'server-only';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated_prisma/client';
import { createDatabaseConnectionConfig } from './database-tls';
import { getDatabaseEnv } from './env';

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export function getDb(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const { DATABASE_URL } = getDatabaseEnv();
  const adapter = new PrismaPg(createDatabaseConnectionConfig(DATABASE_URL));
  const prisma = new PrismaClient({ adapter });
  globalForPrisma.prisma = prisma;
  return prisma;
}
