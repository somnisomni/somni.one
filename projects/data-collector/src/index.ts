/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ScheduledController, ExecutionContext, D1Database } from "@cloudflare/workers-types";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";
import Const from "./const";
import { collectTargets } from "./lib/collect-target";
import { handle } from "./routes";

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

    return await handle(request);
  },

  async scheduled(controller: ScheduledController, env: CloudflareEnv, ctx: ExecutionContext) {
    const adapter = new PrismaD1(env.DB);
    const db = new PrismaClient({ adapter });

    console.log(`\n[*] Starting process ${Object.keys(collectTargets).length} targets.\n`);

    for(const targetKey in collectTargets) {
      const target = collectTargets[targetKey];

      try {
        console.log(`\n[*] Checking target: '${target.dataId}' (data type: ${target.dataType})`);

        if(await target.shouldRecollect(db)) {
          console.log("... Need to recollect, collecting data now...");

          await target.collect(db);
        } else {
          console.log("... No need to recollect, skipping...");
        }
      } catch(error) {
        if(error instanceof Error) {
          console.error(`Failed to collect data for the target! ${error.name}`);
          console.error(error.message);
        } else {
          console.error(`Failed to collect data for the target! ${String(error)}`);
        }
      }
    }

    console.log("\n[*] Finished collecting and updating data.\n");
  },
};
