import { createAuthClient } from "better-auth/react";

import { publicEnv } from "@/lib/env";

export const authClient = createAuthClient({
  baseURL: publicEnv.appUrl,
});

export const { signIn, signUp, signOut, useSession } = authClient;
