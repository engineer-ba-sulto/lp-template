"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type WaitlistForm } from "@/types/waitlistForm";
import { waitlistFormSchema } from "@/zod/waitlistForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function WaitlistForm() {
  const waitlistForm = useForm<WaitlistForm>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: WaitlistForm) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "top-center",
    });
  }

  return (
    <div className="w-full sm:max-w-md">
      <form id="waitlist-form" onSubmit={waitlistForm.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={waitlistForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="waitlist-form-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Field>
            <Button type="submit" form="waitlist-form">
              Join waitlist
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
