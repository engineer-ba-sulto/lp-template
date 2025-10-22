"use server";

import { getDb } from "@/drizzle/db";
import { waitlistFormTable } from "@/drizzle/schema/waitlistFormSchema";
import { WaitlistForm } from "@/types/waitlistForm";
import { eq } from "drizzle-orm";

export async function addWaitlist(data: WaitlistForm) {
  const db = await getDb();
  try {
    const existingEmail = await db
      .select()
      .from(waitlistFormTable)
      .where(eq(waitlistFormTable.email, data.email));
    if (existingEmail.length > 0) {
      return {
        success: false,
        message: "このメールアドレスは既に登録されています",
      };
    }
    await db.insert(waitlistFormTable).values({
      email: data.email,
    });
    return { success: true, message: "ウェイトリストに追加されました" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "不明なエラーが発生しました" };
  }
}
