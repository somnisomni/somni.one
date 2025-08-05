/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ScheduledController, ExecutionContext, D1Database } from "@cloudflare/workers-types";
import Const from "./const";
import { collectTargets } from "./lib/collect-target";
import { getDB, initDB } from "./lib/db";
import { handle } from "./routes";

export interface CloudflareEnv {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: CloudflareEnv, ctx: ExecutionContext): Promise<Response> {
    initDB(env.DB);

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
    initDB(env.DB);
    const db = getDB();

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
