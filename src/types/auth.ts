import { signInEmailSchema, signUpEmailSchema } from "@/zod/auth.schema";
import z from "zod";

// 型定義のエクスポート
export type SignUpEmail = z.infer<typeof signUpEmailSchema>;
export type SignInEmail = z.infer<typeof signInEmailSchema>;
