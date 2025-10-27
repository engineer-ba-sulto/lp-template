"use server";

import { getDb } from "@/drizzle/db";
import { waitlistTable } from "@/drizzle/schema/waitlistSchema";
import { type Waitlist, type WaitlistForm } from "@/types/waitlist";
import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getWaitlist(): Promise<Waitlist[]> {
  try {
    const db = await getDb();
    const waitlistData = await db
      .select()
      .from(waitlistTable)
      .orderBy(desc(waitlistTable.createdAt));
    return waitlistData;
  } catch (error: unknown) {
    console.error("Failed to fetch waitlist data:", error);
    throw new Error("ウェイトリストデータの取得に失敗しました");
  }
}

export async function addWaitlist(data: WaitlistForm) {
  try {
    const db = await getDb();
    await db.insert(waitlistTable).values({
      email: data.email,
    });
  } catch (error: unknown) {
    console.error("Insert failed:", error);
    // データベースエラーメッセージから重複エラーを判定
    if (error && typeof error === "object") {
      // causeプロパティのチェック
      if ("cause" in error) {
        const cause = (error as { cause: unknown }).cause;
        const causeString = String(cause);
        if (
          causeString.includes("UNIQUE constraint failed") ||
          causeString.includes("unique constraint") ||
          causeString.includes("duplicate key") ||
          causeString.includes("UNIQUE") ||
          causeString.includes("unique") ||
          causeString.includes("duplicate") ||
          causeString.includes("constraint failed") ||
          causeString.includes("SQLITE_CONSTRAINT")
        ) {
          return {
            success: false,
            error: "email",
            message: "このメールアドレスは既に登録されています",
          };
        }
      }
    }
    // その他のエラー
    return {
      success: false,
      error: "general",
      message: "登録処理中にエラーが発生しました。もう一度お試しください。",
    };
  }

  // 成功時のみリダイレクト
  redirect("/thank-you");
}
