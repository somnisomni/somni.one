import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import type { D1Database } from "@cloudflare/workers-types";

export class Database {
  private static adapter: PrismaD1;
  public static db: PrismaClient;

  private constructor() { }

  public static initialize(db: D1Database): PrismaClient {
    this.adapter = new PrismaD1(db);
    this.db = new PrismaClient({ adapter: this.adapter });
    return this.db;
  }
}
