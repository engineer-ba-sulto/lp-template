"use client";

import { addWaitlist } from "@/actions/addWaitlist.action";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type WaitlistForm } from "@/types/waitlistForm";
import { waitlistFormSchema } from "@/zod/waitlistForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export default function WaitlistForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<WaitlistForm>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: WaitlistForm) => {
    console.log("Form submitted with data:", data);
    const result = await addWaitlist(data);
    console.log("Server result:", result);

    if (result && !result.success) {
      console.log("Setting error:", result.message);
      // サーバーエラーを適切なフィールドに設定
      if (result.error === "email") {
        // メールアドレス関連のエラー
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
    }
  };

  return (
    <div className="w-full sm:max-w-md">
      <form id="waitlist-form" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">メールアドレス</FieldLabel>
                <Input
                  {...field}
                  id="waitlist-form-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="example@example.com"
                  autoComplete="email"
                />
                {fieldState.invalid && <FieldError errors={[errors.email]} />}
              </Field>
            )}
          />
          <Field>
            <Button type="submit" form="waitlist-form">
              ウェイトリストに参加
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
