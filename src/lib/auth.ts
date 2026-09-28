import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { db, schema } from "@/lib/db";
import { publicEnv } from "@/lib/env";

/**
 * The signing secret is read from BETTER_AUTH_SECRET by Better Auth itself, and
 * validated when the first request builds the auth context. Passing it here
 * instead would read the env var at import time, which `next build` also does.
 */
export const auth = betterAuth({
  baseURL: publicEnv.appUrl,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
    /**
     * The neon-http driver throws on `db.transaction()`. The Postgres paths in
     * the Drizzle adapter use `RETURNING` instead of transactions, so leaving
     * this off keeps every operation on a code path neon-http supports.
     */
    transaction: false,
  }),
  emailAndPassword: {
    // Wiring only — sign-up/sign-in screens and email sending come later.
    enabled: true,
  },
  // Must stay last: lets server actions set auth cookies.
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
