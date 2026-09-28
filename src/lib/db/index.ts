import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";

import { serverEnv } from "@/lib/env";
import * as schema from "./schema";

export type Database = NeonHttpDatabase<typeof schema>;

let instance: Database | undefined;

/**
 * Neon over HTTP: one stateless fetch per query, which is what we want on
 * serverless. This driver has no transaction support — see the note in
 * `src/lib/auth.ts`. If you later need real transactions, swap to
 * `drizzle-orm/neon-serverless` (WebSocket `Pool`).
 */
function connect(): Database {
  instance ??= drizzle(neon(serverEnv.databaseUrl), { schema });
  return instance;
}

/**
 * Connects on first property access rather than at import time. `next build`
 * imports route modules to collect their config, so an eager connection would
 * make the build require a live DATABASE_URL — breaking CI and image builds.
 */
export const db: Database = new Proxy({} as Database, {
  get(_target, property) {
    const database = connect();
    const value = Reflect.get(database, property) as unknown;
    return typeof value === "function" ? value.bind(database) : value;
  },
  has(_target, property) {
    return Reflect.has(connect(), property);
  },
});

export { schema };
