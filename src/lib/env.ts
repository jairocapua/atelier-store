/**
 * Central place where raw `process.env` access is allowed.
 *
 * Server-only values are read lazily via getters so that importing this module
 * never reads them — only actually using a value does. That keeps `next build`,
 * which imports every route module, from requiring a live database.
 *
 * BETTER_AUTH_SECRET is deliberately absent: Better Auth reads and validates it
 * from the environment on its own. See `src/lib/auth.ts`.
 */

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Copy .env.example to .env.local and fill it in.`,
    );
  }
  return value;
}

export const serverEnv = {
  get databaseUrl() {
    return required("DATABASE_URL");
  },
};

/** Safe to reference from the browser. */
export const publicEnv = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
};
