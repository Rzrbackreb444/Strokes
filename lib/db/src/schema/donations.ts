import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  stripeSessionId: text("stripe_session_id").notNull().unique(),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  kind: text("kind").notNull(),
  amountCents: integer("amount_cents").notNull(),
  currency: text("currency").notNull().default("usd"),
  isRecurring: boolean("is_recurring").notNull().default(false),
  donorName: text("donor_name"),
  donorEmail: text("donor_email").notNull(),
  tributeOf: text("tribute_of"),
  scholarshipTier: text("scholarship_tier"),
  recipientName: text("recipient_name"),
  recipientEmail: text("recipient_email"),
  giftMessage: text("gift_message"),
  receiptSentAt: timestamp("receipt_sent_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertDonationSchema = createInsertSchema(donations).omit({ id: true, createdAt: true });
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type Donation = typeof donations.$inferSelect;
