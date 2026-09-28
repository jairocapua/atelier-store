<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# atelier-store

Guidance for any coding agent working in this repository. `next dev` only
rewrites the marked block above; everything below it is ours to edit.

## Project state

Scaffold only — wiring, not features. There is no storefront, catalog, cart,
checkout, payment, or auth UI, and `src/lib/db/schema.ts` defines no tables yet.
Treat the absence of these as "not built yet", not as something to work around.

Stack: Next.js 16 (App Router, Turbopack), TypeScript strict, Tailwind CSS v4,
Better Auth, Drizzle ORM, Neon Postgres over HTTP.

## Commands

```bash
npm run dev          # dev server
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
```

Database and auth schema:

```bash
npm run auth:generate  # regenerate auth tables from src/lib/auth.ts
npm run db:push        # push schema straight to Neon (dev)
npm run db:generate    # emit a SQL migration into ./drizzle
npm run db:migrate     # apply migrations
npm run db:studio      # Drizzle Studio
```

No test runner is installed. Do not reference or assume one — if tests are
wanted, the framework has to be chosen and added first.

## First run

`.env.local` is gitignored and holds a pre-generated `BETTER_AUTH_SECRET`, but
`DATABASE_URL` starts blank and needs the **pooled** Neon connection string.

Better Auth 1.7 hard-fails every auth request with a 500 (`SCHEMA_MISMATCH`)
until its four tables — `user`, `session`, `account`, `verification` — exist in
the Drizzle schema. A 500 from `/api/auth/*` on a fresh clone is this, not
broken wiring. To resolve: `npm run auth:generate`, re-export the generated file
from `src/lib/db/schema.ts` (`export * from "./auth-schema"`), then
`npm run db:push`.

## Architecture

Request path: `src/app/api/auth/[...all]/route.ts` → `toNextJsHandler` →
`auth` (`src/lib/auth.ts`) → Drizzle adapter → `db` (`src/lib/db/index.ts`) →
Neon. `src/lib/auth-client.ts` is the browser-side counterpart.

Four decisions here are load-bearing and were each verified against a failure;
changing them breaks things that are not obvious from the file you are editing.

**`db` is a lazy Proxy, deliberately.** It connects on first property access,
not at import time. `next build` imports every route module to collect its
config, so an eager `neon(...)` call makes the build require a live
`DATABASE_URL` — this was observed failing, not theorized. Keep the connection
behind `connect()`.

**`env.ts` is the only place `process.env` is read.** Server values sit behind
getters for the same build-time reason. `BETTER_AUTH_SECRET` is intentionally
*not* in `env.ts` or passed to `betterAuth()`: Better Auth reads and validates
it from the environment per request, so routing it through config would
reintroduce an import-time read and break builds without env.

**No transactions are available.** The neon-http driver throws
`"No transactions support in neon-http driver"`. The Drizzle adapter is pinned
to `transaction: false`, which is safe only because its `db.transaction()` calls
are MySQL-only paths while `provider: "pg"` uses `RETURNING`. Order placement
will likely need real transactions — that means switching
`src/lib/db/index.ts` to `drizzle-orm/neon-serverless` with a WebSocket `Pool`,
not flipping the flag.

**`nextCookies()` must stay last in the `plugins` array** so server actions can
set auth cookies.

## Conventions

- `@/*` maps to `./src/*`.
- Auth tables are generated, never hand-edited; re-run `auth:generate` after
  changing auth config (plugins, extra user fields). Commerce tables get their
  own modules in `src/lib/db/` and are re-exported from `schema.ts`, which is
  the single schema barrel that both `db` and `drizzle.config.ts` consume.
- `drizzle.config.ts` loads `.env.local` then `.env` via dotenv itself, since
  drizzle-kit runs outside Next.js and gets none of Next's env handling.
- `.gitignore` carries a `!.env.example` negation — Next's default `.env*` rule
  would otherwise ignore the committed example file.
