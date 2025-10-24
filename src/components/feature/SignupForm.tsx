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
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">アカウントを作成</CardTitle>
          <CardDescription>新しいアカウントにサインイン</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">名前</FieldLabel>
                <Input id="name" type="text" placeholder="山田太郎" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">メールアドレス</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">パスワード</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="8文字以上のパスワード"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  パスワードを確認
                </FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="パスワードを再入力"
                  required
                />
              </Field>
              <FieldGroup>
                <Field>
                  <Button type="submit">アカウントを作成</Button>
                  <FieldDescription className="px-6 text-center">
                    アカウントをお持ちの方はこちら{" "}
                    <Link href="/login" className="text-primary">
                      ログイン
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
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
