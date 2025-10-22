import { checkWaitlist } from "@/actions/addWaitlist.action";
import * as z from "zod";

export const waitlistFormSchema = z.object({
  email: z.email("有効なメールアドレスを入力してください。").refine(
    async (val) => {
      const existingEmail = await checkWaitlist({ email: val });
      return !existingEmail
    },
    {
      message: "このメールアドレスは既に登録されています",
    }
  ),
});
