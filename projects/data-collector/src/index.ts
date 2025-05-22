import type { ScheduledController, ExecutionContext, D1Database } from "@cloudflare/workers-types";
import { Database } from "./db";

export interface CloudflareEnv {
  DB: D1Database;
}

export default {
  async scheduled(controller: ScheduledController, env: CloudflareEnv, ctx: ExecutionContext) {
    const db = Database.initialize(env.DB);
  },
};
