"use server";

import { auth } from "@/lib/auth/server";
import { type SignInEmail, type SignUpEmail } from "@/types/auth";

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
    // Better Auth のエラーレスポンスを解析
    if (error && typeof error === "object" && "message" in error) {
      const message = (error as { message: string }).message;
      // メールアドレスが既に存在する場合
      if (message === "User already exists. Use another email.") {
        return {
          success: false,
          error: "email",
          message: "このメールアドレスは既に登録されています",
        };
      }
      // パスワード関連のエラー
      if (message === "Password is required.") {
        return {
          success: false,
          error: "password",
          message: "パスワードの形式が正しくありません",
        };
      }
      // その他のエラー
      return {
        success: false,
        error: "general",
        message: "アカウントの作成に失敗しました。もう一度お試しください。",
      };
    }
    // 予期しないエラー
    return {
      success: false,
      error: "general",
      message: "アカウントの作成に失敗しました。もう一度お試しください。",
    };
  }
};

export const signInEmail = async (data: SignInEmail) => {
  try {
    const authInstance = await auth();
    const res = await authInstance.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });
    return { success: true, data: res };
  } catch (error: unknown) {
    console.error("SignIn error:", error);
    // Better Auth のエラーレスポンスを解析
    if (error && typeof error === "object" && "message" in error) {
      const message = (error as { message: string }).message;
      // メールアドレスまたはパスワードが正しくない場合
      if (message === "Invalid email or password") {
        return {
          success: false,
          error: "email & password",
          message: "メールアドレスまたはパスワードが正しくありません",
        };
      }
      // アカウントが無効化されている場合
      if (
        message === "Account is disabled." ||
        message === "User account is disabled."
      ) {
        return {
          success: false,
          error: "account",
          message:
            "アカウントが無効化されています。管理者にお問い合わせください。",
        };
      }
      // その他のエラー
      return {
        success: false,
        error: "general",
        message: "サインインに失敗しました。もう一度お試しください。",
      };
    }
    // 予期しないエラー
    return {
      success: false,
      error: "general",
      message: "サインインに失敗しました。もう一度お試しください。",
    };
  }
};
