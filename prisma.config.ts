import { config } from 'dotenv';
import { defineConfig } from 'prisma/config';
import { getPrismaCliUrl } from './src/lib/prisma-tls';

config({ path: '.env.local', quiet: true });
config({ quiet: true });

// Generation/build need no database. Migration commands require DIRECT_URL.
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  datasource: {
    url: getPrismaCliUrl(process.env.DIRECT_URL),
    shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL
      ? getPrismaCliUrl(process.env.SHADOW_DATABASE_URL, 'SHADOW_DATABASE_URL')
      : undefined,
  },
});
