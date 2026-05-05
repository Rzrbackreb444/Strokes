import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  handle: text("handle").notNull(),
  recoveryStage: text("recovery_stage"),
  focusArea: text("focus_area"),
  pullQuote: text("pull_quote").notNull(),
  body: text("body").notNull(),
  videoUrl: text("video_url"),
  posterUrl: text("poster_url"),
  isFeatured: boolean("is_featured").notNull().default(false),
  isApproved: boolean("is_approved").notNull().default(false),
  submitterEmail: text("submitter_email"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertStorySchema = createInsertSchema(stories).omit({ id: true, createdAt: true });
export type InsertStory = z.infer<typeof insertStorySchema>;
export type Story = typeof stories.$inferSelect;
