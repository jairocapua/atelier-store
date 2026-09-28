# atelier-store

Scaffold for an eCommerce app. This is **wiring only** — no storefront, catalog,
cart, checkout, payments, or auth UI yet.

## Stack

| Concern    | Choice                                        |
| ---------- | --------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack)            |
| Language   | TypeScript (strict)                           |
| Styling    | Tailwind CSS v4                               |
| Auth       | Better Auth                                   |
| ORM        | Drizzle ORM                                   |
| Database   | Neon Postgres (`@neondatabase/serverless`, HTTP) |

## Getting started

### 1. Environment

```bash
cp .env.example .env.local
```

`.env.local` already exists with a freshly generated `BETTER_AUTH_SECRET`. Set
`DATABASE_URL` to the **pooled** connection string from your Neon dashboard.

### 2. Create the auth tables

No tables are defined yet, and **Better Auth returns 500 on every request until
its four tables exist**. Generate them from the auth config, then push:

```bash
npm run auth:generate   # writes src/lib/db/auth-schema.ts
npm run db:push         # applies it to Neon
```

Then re-export them so `db` and the auth adapter pick them up — in
`src/lib/db/schema.ts`:

```ts
export * from "./auth-schema";
```

Re-run `auth:generate` whenever you change auth config (plugins, extra user
fields).

### 3. Run

```bash
npm run dev
```

## Scripts

| Script                | Purpose                                     |
| --------------------- | ------------------------------------------- |
| `npm run dev`         | Dev server                                  |
| `npm run build`       | Production build                            |
| `npm run start`       | Serve the production build                  |
| `npm run lint`        | ESLint                                      |
| `npm run typecheck`   | `tsc --noEmit`                              |
| `npm run auth:generate` | Generate Drizzle tables from auth config  |
| `npm run db:generate` | Create a SQL migration from the schema      |
| `npm run db:migrate`  | Apply migrations                            |
| `npm run db:push`     | Push the schema straight to the DB (dev)    |
| `npm run db:studio`   | Drizzle Studio                              |

## Layout

```
src/
  app/
    api/auth/[...all]/route.ts   Better Auth request handler
    layout.tsx  page.tsx  globals.css
  lib/
    auth.ts         Better Auth server instance
    auth-client.ts  Better Auth React client
    env.ts          the only place process.env is read
    db/
      index.ts      Drizzle client over Neon HTTP
      schema.ts     schema barrel (empty — see step 2)
drizzle.config.ts   drizzle-kit config
```

## Notes for future work

- **`db` connects lazily.** `next build` imports every route module, so an
  eager connection would make builds require a live database. Keep it lazy.
- **No transactions.** The neon-http driver throws on `db.transaction()`. The
  Drizzle adapter is configured with `transaction: false`, and its Postgres
  paths use `RETURNING` instead. If you need real transactions (likely for
  order placement), switch `src/lib/db/index.ts` to
  `drizzle-orm/neon-serverless` with a WebSocket `Pool`.
- **`BETTER_AUTH_SECRET` is not passed in config.** Better Auth reads it from
  the environment and validates it per request, which keeps it out of the build.
- `emailAndPassword` is enabled but no sign-in/sign-up UI or transactional email
  is wired up.
