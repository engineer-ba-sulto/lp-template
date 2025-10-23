/**
 * 開発時と本番時のドメインを判別してベースURLを取得する関数
 * @returns 適切なベースURL
 */
export function getBaseUrl(): string {
  // サーバーサイドでの実行時
  if (typeof window === "undefined") {
    // 本番環境（Cloudflare Workers）
    if (process.env.NODE_ENV === "production") {
      // Cloudflare Workersの環境変数から取得
      return (
        process.env.CF_PAGES_URL || "https://rn.engineer-ba-sulto.com"
      );
    }
    // 開発環境
    return "http://localhost:3000";
  }

  // クライアントサイドでの実行時
  return window.location.origin;
}
