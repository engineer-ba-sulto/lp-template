import { drizzle } from "drizzle-orm/d1";

// Better Auth CLI実行時に使用
// npx @better-auth/cli@latest generate --output=./src/drizzle/schema/authSchema.ts --config=./src/lib/auth/server.ts
export const getMockDb = () => {
  // モックのデータベースインスタンスを返す（スキーマ生成には実際の接続は不要）
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return drizzle({} as any);
};
