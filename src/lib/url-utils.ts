"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * 開発時と本番時のドメインを判別してベースURLを取得する関数
 * @returns 適切なベースURL
 */
export async function getBaseUrl(): Promise<string> {
  const { env } = await getCloudflareContext({ async: true });

  // サーバーサイドでの実行時
  if (typeof window === "undefined") {
    // 本番環境（Cloudflare Workers）
    if (process.env.NODE_ENV === "production") {
      // Cloudflare Workersの環境変数から取得
      console.log("CF_PAGES_URL", env.CF_PAGES_URL);
      return env.CF_PAGES_URL || "http://localhost:3000";
    }
    // 開発環境
    return "http://localhost:3000";
  }

  // クライアントサイドでの実行時
  return window.location.origin;
}
