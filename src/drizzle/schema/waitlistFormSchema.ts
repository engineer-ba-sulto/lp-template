import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const waitlistFormTable = sqliteTable("waitlist_form_table", {
  id: text()
    .primaryKey()
    .notNull()
    .$defaultFn(() => nanoid(10)),
  email: text().notNull().unique(),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(current_timestamp)`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => new Date())
    .notNull(),
});
