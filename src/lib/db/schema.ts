/**
 * Drizzle schema barrel.
 *
 * Intentionally empty for now — no tables are defined yet.
 *
 * Auth tables (user, session, account, verification) are generated rather than
 * hand-written. Run:
 *
 *     npm run auth:generate
 *
 * which writes them into this directory via the Better Auth CLI. Re-export them
 * from here so both `db` and the Better Auth adapter pick them up:
 *
 *     export * from "./auth-schema";
 *
 * Commerce tables (products, carts, orders, ...) get their own modules in this
 * directory and are re-exported here too.
 */

export {};
