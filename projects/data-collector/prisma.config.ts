import "dotenv/config";

import path from "node:path";
import { listLocalDatabases } from "@prisma/adapter-d1";
import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: process.env.DEV ? { url: `file://${listLocalDatabases().pop()}` } : undefined,
});
