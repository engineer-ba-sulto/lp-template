import * as z from "zod";

export const waitlistFormSchema = z.object({
  email: z.email("有効なメールアドレスを入力してください。"),
});
