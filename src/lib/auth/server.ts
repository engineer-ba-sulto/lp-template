import { getDb } from "@/drizzle/db";
import * as authSchema from "@/drizzle/schema/authSchema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { isEmailAddressAllowed } from "./domainUtils";

// https://www.better-auth.com/docs/adapters/drizzle#example-usage を参考
export const auth = async () => {
  const db = await getDb();
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
      usePlural: true,
      schema: {
        ...authSchema,
        user: authSchema.users,
      },
    }),
    emailAndPassword: {
      enabled: true,
    },
    hooks: {
      before: createAuthMiddleware(async (ctx) => {
        console.log("Auth hook triggered for path:", ctx.path);

        if (ctx.path !== "/sign-in/email") {
          return;
        }

        const email = ctx.body?.email;
        console.log("Email from request:", email);

        if (!email) {
          return;
        }

        const isAllowed = isEmailAddressAllowed(email);
        console.log("Is email address allowed:", isAllowed);

        if (!isAllowed) {
          console.log("Blocking login for email:", email);
          throw new APIError("BAD_REQUEST", {
            message: "このメールアドレスではログインできません",
          });
        }
      }),
    },
  });
};
