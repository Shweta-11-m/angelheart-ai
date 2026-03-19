import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const voiceJournalTable = pgTable("voice_journal", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  transcript: text("transcript").notNull(),
  emotionalTone: text("emotional_tone"),
  audioData: text("audio_data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertVoiceSchema = createInsertSchema(voiceJournalTable).omit({ id: true, createdAt: true });
export type InsertVoice = z.infer<typeof insertVoiceSchema>;
export type VoiceEntry = typeof voiceJournalTable.$inferSelect;
