import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id", {
    length: 255,
  }).primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
});

export const sessions = sqliteTable("session", {
  id: text("id", {
    length: 255,
  }).primaryKey(),
  userId: text("user_id", {
    length: 255,
  })
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at").notNull(),
});

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertPost = typeof posts.$inferInsert;
export type SelectPost = typeof posts.$inferSelect;
