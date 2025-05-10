import "dotenv/config";
import path from "node:path";
import type { PrismaConfig } from "prisma";

type Env = {
  DB_USER?: string;
  DB_PASSWORD?: string;
  DB_PORT?: string;
  DB_NAME?: string;
  DATABASE_URL?: string;
};

export default {
  earlyAccess: true,
  schema: path.join("backend", "prisma", "schema.prisma"),
} satisfies PrismaConfig<Env>;
