/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ScheduledController, ExecutionContext, D1Database } from "@cloudflare/workers-types";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";
import GitHubCommitDataCollector from "./collectors/github-commit";
import Const from "./const";
import GitHubPullRequestDataCollector from "./collectors/github-pull-request";

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

    const testCollector = new GitHubCommitDataCollector("somnisomni", "somni.one", "8326d759f2c6525238623ddea94c9ca15343a7ea");
    if(await testCollector.shouldRecollect(db)) {
      console.log("need to collect");
      console.log(await testCollector.collect(db));
    } else {
      console.log("no need to collect");
      console.log(await testCollector.getExisting(db));
    }

    const testCollectorPr = new GitHubPullRequestDataCollector("openresty", "headers-more-nginx-module", 134);
    if(await testCollectorPr.shouldRecollect(db)) {
      console.log("need to collect PR");
      console.log(await testCollectorPr.collect(db));
    } else {
      console.log("no need to collect PR");
      console.log(await testCollectorPr.getExisting(db));
    }
  },
};
