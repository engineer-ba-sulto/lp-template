import { getDb } from "@/drizzle/db";
import * as authSchema from "@/drizzle/schema/authSchema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

// https://www.better-auth.com/docs/adapters/drizzle#example-usage を参考
export const auth = async () => {
  const db = await getDb();
  return betterAuth({
    database: drizzleAdapter(db, {
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
};
