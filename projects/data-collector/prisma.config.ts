import "dotenv/config";

import type { PrismaConfig } from "prisma";
import path from "node:path";
// import { PrismaD1 } from "@prisma/adapter-d1";

// type Env = {
//   CLOUDFLARE_ACCOUNT_ID: string;
//   CLOUDFLARE_DATABASE_ID: string;
//   CLOUDFLARE_D1_TOKEN: string;
// };

export default {
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: "file:./prisma/d1.db",
  },
  // async adapter() {
  //   const env = process.env as Env;

  //   return new PrismaD1({
  //     CLOUDFLARE_ACCOUNT_ID: env.CLOUDFLARE_ACCOUNT_ID,
  //     CLOUDFLARE_DATABASE_ID: env.CLOUDFLARE_DATABASE_ID,
  //     CLOUDFLARE_D1_TOKEN: env.CLOUDFLARE_D1_TOKEN,
  //   });
  // },
} satisfies PrismaConfig;
