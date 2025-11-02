import { pgTable, serial, text, timestamp, varchar, uuid } from "drizzle-orm/pg-core";

// Example table - posts that reference Supabase auth users
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  // Reference to Supabase auth.users table
  userId: uuid("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
