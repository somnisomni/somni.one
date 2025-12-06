import "dotenv/config";

import type { PrismaConfig } from "prisma";
import path from "node:path";
import { listLocalDatabases } from "@prisma/adapter-d1";

export default {
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: `file://${listLocalDatabases().pop()}`,
  },
} satisfies PrismaConfig;
