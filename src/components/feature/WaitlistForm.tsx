"use client";

import { addWaitlist } from "@/actions/addWaitlist.action";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type WaitlistForm } from "@/types/waitlistForm";
import { waitlistFormSchema } from "@/zod/waitlistForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function WaitlistForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistForm>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: WaitlistForm) {
    const result = await addWaitlist(data);
    if (result && result.success === false) {
      toast.error(result.message, {
        position: "top-center",
        classNames: {
          content: "text-red-500 font-bold",
        },
      });
    }
  }

  return (
    <div className="w-full sm:max-w-md">
      <form id="waitlist-form" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="waitlist-form-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                {fieldState.invalid && <FieldError errors={[errors.email]} />}
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
