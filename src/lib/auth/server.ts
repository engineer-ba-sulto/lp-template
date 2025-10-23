import { getDbSync } from "@/drizzle/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

// https://www.better-auth.com/docs/adapters/drizzle#example-usage を参考
export const auth = betterAuth({
  database: drizzleAdapter(getDbSync(), {
    provider: "sqlite",
  }),
});

export default auth;
