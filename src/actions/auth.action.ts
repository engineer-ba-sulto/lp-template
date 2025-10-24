"use server";

import { auth } from "@/lib/auth/server";
import { SignUpEmail } from "@/types/auth";

export const signUpEmail = async (data: SignUpEmail) => {
  try {
    const authInstance = await auth();
    const res = await authInstance.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
    return { success: true, data: res };
  } catch (error: unknown) {
    console.error("SignUp error:", error);
    return {
      success: false,
      error: "general",
      message: "アカウントの作成に失敗しました。もう一度お試しください。",
    };
  }
};
