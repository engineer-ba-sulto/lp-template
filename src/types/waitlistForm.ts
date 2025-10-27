import { waitlistFormTable } from "@/drizzle/schema/waitlistFormSchema";
import { type waitlistFormSchema } from "@/zod/waitlistForm.schema";
import { type z } from "zod";

export type WaitlistForm = z.infer<typeof waitlistFormSchema>;
export type WaitlistRecord = typeof waitlistFormTable.$inferSelect;
