import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';

// Users table untuk autentikasi
export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role', { enum: ['user', 'admin'] }).notNull().default('user'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Cars table untuk data mobil rental
export const cars = sqliteTable('cars', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  name: text('name').notNull(),
  capacity: integer('capacity').notNull(),
  transmission: text('transmission', { enum: ['manual', 'automatic'] }).notNull(),
  pricePerDay: real('price_per_day').notNull(),
  imageFilename: text('image_filename').notNull(),
  description: text('description'),
  available: integer('available', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Reviews table untuk review mobil
export const reviews = sqliteTable('reviews', {
  id: text('id').primaryKey().$defaultFn(() => nanoid()),
  carId: text('car_id').notNull().references(() => cars.id, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  userName: text('user_name').notNull(),
  comment: text('comment').notNull(),
  rating: integer('rating').notNull(), // Rating 1-5, validation di application layer
  isVerified: integer('is_verified', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Types untuk TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Car = typeof cars.$inferSelect;
export type NewCar = typeof cars.$inferInsert;

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;