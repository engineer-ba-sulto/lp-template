import { type waitlistFormSchema } from "@/zod/waitlistForm.schema";
import { type z } from "zod";

export type WaitlistForm = z.infer<typeof waitlistFormSchema>;
