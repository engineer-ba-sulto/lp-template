import { getCurrentDateInJST } from "@/lib/date";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const waitlistFormTable = sqliteTable("waitlist_form_table", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => nanoid(10)),
  email: text("email").notNull().unique(),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => getCurrentDateInJST()),
  updatedAt: text("updated_at")
    .notNull()
    .$defaultFn(() => getCurrentDateInJST())
    .$onUpdate(() => getCurrentDateInJST()),
});
