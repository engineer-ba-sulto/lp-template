import { getDbSync } from "@/drizzle/db";
import * as authSchema from "@/drizzle/schema/authSchema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

// https://www.better-auth.com/docs/adapters/drizzle#example-usage を参考
export const auth = betterAuth({
  database: drizzleAdapter(getDbSync(), {
    provider: "sqlite",
    usePlural: true,
	}),
	emailAndPassword: { 
    enabled: true, 
  }, 
  schema: {
    ...authSchema,
    user: authSchema.users,
  },
});
