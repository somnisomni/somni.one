/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ScheduledController, ExecutionContext, D1Database } from "@cloudflare/workers-types";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";
import Const from "./const";

export interface CloudflareEnv {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: CloudflareEnv, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if(url.pathname === "/") {
      return new Response(null, {
        status: 301,
        headers: {
          Location: Const.HomepageUrl,
        },
      });
    }

    return new Response("Not Found", { status: 404 });
  },

  async scheduled(controller: ScheduledController, env: CloudflareEnv, ctx: ExecutionContext) {
    const adapter = new PrismaD1(env.DB);
    const db = new PrismaClient({ adapter });
  },
};
