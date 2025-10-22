CREATE TABLE `waitlist_form_table` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `waitlist_form_table_email_unique` ON `waitlist_form_table` (`email`);