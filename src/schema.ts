import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

// Users table
export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => uuidv4()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role', { enum: ['user', 'admin'] }).notNull().default('user'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Cars table
export const cars = sqliteTable('cars', {
  id: text('id').primaryKey().$defaultFn(() => uuidv4()),
  name: text('name').notNull(),
  capacity: integer('capacity').notNull(),
  transmission: text('transmission', { enum: ['manual', 'automatic'] }).notNull(),
  pricePerDay: real('price_per_day').notNull(),
  imageFilename: text('image_filename').notNull(),
  description: text('description').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Reviews table
export const reviews = sqliteTable('reviews', {
  id: text('id').primaryKey().$defaultFn(() => uuidv4()),
  carId: text('car_id').references(() => cars.id, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  userName: text('user_name').notNull(),
  comment: text('comment').notNull(),
  rating: integer('rating').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const insertCarSchema = createInsertSchema(cars, {
  name: z.string().min(2),
  capacity: z.number().min(1).max(10),
  transmission: z.enum(['manual', 'automatic']),
  pricePerDay: z.number().min(0),
  imageFilename: z.string().min(1),
  description: z.string().min(10),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const insertReviewSchema = createInsertSchema(reviews, {
  userName: z.string().min(2),
  comment: z.string().min(10),
  rating: z.number().min(1).max(5),
}).omit({ id: true, createdAt: true, updatedAt: true });

// Select schemas
export const selectUserSchema = createSelectSchema(users);
export const selectCarSchema = createSelectSchema(cars);
export const selectReviewSchema = createSelectSchema(reviews);

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Car = typeof cars.$inferSelect;
export type NewCar = typeof cars.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;