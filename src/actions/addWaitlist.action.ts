"use server";

import { getDb } from "@/drizzle/db";
import { waitlistFormTable } from "@/drizzle/schema/waitlistFormSchema";
import { type WaitlistForm } from "@/types/waitlistForm";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

/**
 * 指定されたメールアドレスをデータベースで検索する
 * @param email 検索するメールアドレス
 * @returns 存在すればユーザー情報、しなければundefined
 */
async function findEmail(email: string) {
  const db = await getDb();
  return db
    .select({ id: waitlistFormTable.id })
    .from(waitlistFormTable)
    .where(eq(waitlistFormTable.email, email))
    .limit(1)
    .then((result) => result[0]);
}

export async function addWaitlist(data: WaitlistForm) {
  let existingEmail;
  try {
    existingEmail = await findEmail(data.email);
  } catch (error) {
    console.error("Database connection failed:", error);
    return {
      success: false,
      message: "データベースへの接続に失敗しました。設定を確認してください。",
    };
  }

  if (existingEmail) {
    return {
      success: false,
      message: "このメールアドレスは既に登録されています",
    };
  }

  try {
    const db = await getDb();
    await db.insert(waitlistFormTable).values({
      email: data.email,
    });
  } catch (error: unknown) {
    console.error("Insert failed:", error);
    return { success: false, message: "登録処理中にエラーが発生しました。" };
  }

  redirect("/thank-you");
}

export async function checkWaitlist(data: WaitlistForm): Promise<boolean> {
  try {
    const existingEmail = await findEmail(data.email);
    return Boolean(existingEmail);
  } catch {
    // DB接続エラーなどの場合、バリデーションは一旦通す
    return false;
  }
}
