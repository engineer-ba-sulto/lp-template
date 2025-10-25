"use client";

import { signInEmail } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type SignInEmail } from "@/types/auth";
import { signInEmailSchema } from "@/zod/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInEmail>({
    resolver: zodResolver(signInEmailSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInEmail) => {
    const result = await signInEmail(data);
    if (result && !result.success) {
      // サーバーエラーを適切なフィールドに設定
      if (result.error === "email & password") {
        // メールアドレスとパスワードの両方にエラーを設定
        setError("email", {
          type: "server",
        });
        setError("password", {
          type: "server",
          message: result.message,
        });
      } else if (result.error === "account") {
        // アカウント関連のエラーはemailフィールドに表示
        setError("email", {
          type: "server",
          message: result.message,
        });
      } else {
        // 一般的なエラーの場合はemailフィールドに表示
        setError("email", {
          type: "server",
          message: result.message,
        });
      }
    } else if (result && result.success) {
      redirect("/");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">おかえりなさい</CardTitle>
          <CardDescription>アカウントにログイン</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">メールアドレス</FieldLabel>
                    <Input
                      {...field}
                      id="login-form-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="example@example.com"
                      autoComplete="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[errors.email]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">パスワード</FieldLabel>
                    <Input
                      {...field}
                      id="login-form-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="8文字以上のパスワード"
                      autoComplete="current-password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[errors.password]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <Button type="submit" form="login-form">
                  ログイン
                </Button>
                <FieldDescription className="text-center">
                  アカウントをお持ちでない方はこちら{" "}
                  <Link href="/signup" className="text-primary">
                    サインアップ
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
