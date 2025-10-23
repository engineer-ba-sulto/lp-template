"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";

// Cloudflare D1の場合、ランタイムでデータベースインスタンスを受け取る（非同期版）
export const getDb = async () => {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle(env.waitlist_lp_template_db);
};

// 同期版（Better Auth CLI実行時に使用）
// "npx @better-auth/cli@latest generate --output=./src/drizzle/schema/authSchema.ts --config=./src/lib/auth/server.ts"
export const getDbSync = () => {
  // モックのデータベースインスタンスを返す（スキーマ生成には実際の接続は不要）
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return drizzle({} as any);
};
