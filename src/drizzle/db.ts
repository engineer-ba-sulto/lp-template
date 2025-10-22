"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";

// Cloudflare D1の場合、ランタイムでデータベースインスタンスを受け取る
export const getDb = async () => {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle(env.waitlist_lp_template_db);
};
