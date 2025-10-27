"use client";

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
import { signUpWithEmail } from "@/lib/auth/authUtils";
import { cn } from "@/lib/utils";
import { type SignUpEmail } from "@/types/auth";
import { signUpEmailSchema } from "@/zod/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpEmail>({
    resolver: zodResolver(signUpEmailSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpEmail) => {
    const success = await signUpWithEmail(data, setError);
    if (success) {
      router.push("/login");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">アカウントを作成</CardTitle>
          <CardDescription>新しいアカウントにサインイン</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">名前</FieldLabel>
                    <Input
                      {...field}
                      id="signup-form-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="山田太郎"
                      autoComplete="name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[errors.name]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">メールアドレス</FieldLabel>
                    <Input
                      {...field}
                      id="signup-form-email"
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
                      id="signup-form-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="8文字以上のパスワード"
                      autoComplete="new-password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[errors.password]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">
                      パスワードを確認
                    </FieldLabel>
                    <Input
                      {...field}
                      id="signup-form-confirm-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="パスワードを再入力"
                      autoComplete="new-password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[errors.confirmPassword]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <Button type="submit" form="signup-form">
                  アカウントを作成
                </Button>
                <FieldDescription className="text-center">
                  アカウントをお持ちの方はこちら{" "}
                  <Link href="/login" className="text-primary">
                    ログイン
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        続行をクリックすることで、<Link href="/term-of-service">利用規約</Link>
        と<Link href="/privacy-policy">プライバシーポリシー</Link>
        に同意したものとみなされます。
      </div>
    </div>
  );
}
