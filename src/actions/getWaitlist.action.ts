"use server";

import { getDb } from "@/drizzle/db";
import { waitlistFormTable } from "@/drizzle/schema/waitlistFormSchema";
import { WaitlistRecord } from "@/types/waitlistForm";
import { desc } from "drizzle-orm";

export async function getWaitlist(): Promise<WaitlistRecord[]> {
  try {
    const db = await getDb();
    const waitlistData = await db
      .select()
      .from(waitlistFormTable)
      .orderBy(desc(waitlistFormTable.createdAt));
    return waitlistData;
  } catch (error: unknown) {
    console.error("Failed to fetch waitlist data:", error);
    throw new Error("ウェイトリストデータの取得に失敗しました");
  }
}
