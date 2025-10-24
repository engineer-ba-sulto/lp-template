import { z } from "zod";

// サインアップ用のバリデーションスキーマ
export const signUpEmailSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "名前を入力してください")
      .max(50, "名前は50文字以内で入力してください"),
    email: z.email("正しいメールアドレスを入力してください"),
    password: z
      .string()
      .trim()
      .min(8, "パスワードは8文字以上で入力してください")
      .max(100, "パスワードは100文字以内で入力してください"),
    confirmPassword: z
      .string()
      .trim()
      .min(8, "確認用パスワードは8文字以上で入力してください")
      .max(100, "確認用パスワードは100文字以内で入力してください"),
    image: z.url("正しいURLを入力してください").optional(),
    callbackURL: z.url("正しいURLを入力してください").optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

// サインイン用のバリデーションスキーマ
export const signInEmailSchema = z.object({
  email: z.email("正しいメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
  callbackURL: z.url("正しいURLを入力してください").optional(),
});
