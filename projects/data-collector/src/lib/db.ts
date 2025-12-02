import type { D1Database } from "@cloudflare/workers-types";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "../generated/prisma-client/client";

let db: PrismaClient | null = null;

export function initDB(database: D1Database): void {
  db = new PrismaClient({ adapter: new PrismaD1(database) });
}

export function getDB(): PrismaClient {
  if(!db) {
    throw new Error("Database not initialized. Call initDB() first.");
  }

  return db;
}
