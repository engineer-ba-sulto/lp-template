import { type SignInEmail, type SignUpEmail } from "@/types/auth";
import { type UseFormSetError } from "react-hook-form";
import { authClient } from "./client";

/**
 * メールアドレスとパスワードでログインを実行する
 * @param data - ログインデータ
 * @param setError - React Hook FormのsetError関数
 * @returns ログイン成功時はtrue、失敗時はfalse
 */
export async function signInWithEmail(
  data: SignInEmail,
  setError: UseFormSetError<SignInEmail>
): Promise<boolean> {
  try {
    const res = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (!res.error) {
      return true;
    }

    // エラーがある場合は例外を投げてcatch文で処理
    throw new Error(res.error.message);
  } catch (error) {
    // エラーハンドリング
    const message = error instanceof Error ? error.message : "Unknown error";

    if (message === "Invalid email or password") {
      setError("email", { type: "server" });
      setError("password", {
        type: "server",
        message: "メールアドレスまたはパスワードが正しくありません",
      });
    } else if (
      message === "Account is disabled." ||
      message === "User account is disabled."
    ) {
      setError("email", {
        type: "server",
        message:
          "アカウントが無効化されています。管理者にお問い合わせください。",
      });
    } else if (message === "このメールアドレスではログインできません") {
      setError("email", {
        type: "server",
        message:
          "このメールアドレスではログインできません。許可されたメールアドレスを使用してください。",
      });
    } else {
      setError("email", {
        type: "server",
        message: "サインインに失敗しました。もう一度お試しください。",
      });
    }
    return false;
  }
}

/**
 * メールアドレスとパスワードでサインアップを実行する
 * @param data - サインアップデータ
 * @param setError - React Hook FormのsetError関数
 * @returns サインアップ成功時はtrue、失敗時はfalse
 */
export async function signUpWithEmail(
  data: SignUpEmail,
  setError: UseFormSetError<SignUpEmail>
): Promise<boolean> {
  try {
    const res = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (!res.error) {
      return true;
    }

    // エラーがある場合は例外を投げてcatch文で処理
    throw new Error(res.error.message);
  } catch (error) {
    // エラーハンドリング
    const message = error instanceof Error ? error.message : "Unknown error";

    if (message === "User already exists. Use another email.") {
      setError("email", {
        type: "server",
        message: "このメールアドレスは既に登録されています",
      });
    } else if (message === "Password is required.") {
      setError("password", {
        type: "server",
        message: "パスワードの形式が正しくありません",
      });
    } else {
      setError("email", {
        type: "server",
        message: "アカウントの作成に失敗しました。もう一度お試しください。",
      });
    }

    return false;
  }
}
