import path from 'node:path';
import type { PrismaConfig } from 'prisma';
import 'dotenv/config';

type Env = {
  DB_USER?: string;
  DB_PASSWORD?: string;
  DB_HOST?: string;
  DB_PORT?: string;
  DB_NAME?: string;
  DATABASE_URL?: string;
};

const config: PrismaConfig<Env> = {
  earlyAccess: true,
  schema: path.join('backend', 'prisma', 'schema.prisma'),
};

export default config;