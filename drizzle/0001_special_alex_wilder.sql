PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cars` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`capacity` integer NOT NULL,
	`transmission` text NOT NULL,
	`price_per_day` real NOT NULL,
	`image_filename` text NOT NULL,
	`description` text,
	`available` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_cars`("id", "name", "capacity", "transmission", "price_per_day", "image_filename", "description", "available", "created_at", "updated_at") SELECT "id", "name", "capacity", "transmission", "price_per_day", "image_filename", "description", "available", "created_at", "updated_at" FROM `cars`;--> statement-breakpoint
DROP TABLE `cars`;--> statement-breakpoint
ALTER TABLE `__new_cars` RENAME TO `cars`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`car_id` text NOT NULL,
	`user_id` text,
	`user_name` text NOT NULL,
	`comment` text NOT NULL,
	`rating` integer NOT NULL,
	`is_verified` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`car_id`) REFERENCES `cars`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_reviews`("id", "car_id", "user_id", "user_name", "comment", "rating", "is_verified", "created_at", "updated_at") SELECT "id", "car_id", "user_id", "user_name", "comment", "rating", "is_verified", "created_at", "updated_at" FROM `reviews`;--> statement-breakpoint
DROP TABLE `reviews`;--> statement-breakpoint
ALTER TABLE `__new_reviews` RENAME TO `reviews`;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text DEFAULT 'user' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "name", "email", "password", "role", "created_at", "updated_at") SELECT "id", "name", "email", "password", "role", "created_at", "updated_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);