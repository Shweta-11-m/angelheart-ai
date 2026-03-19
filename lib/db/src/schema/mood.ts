import { pgTable, serial, integer, text, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const moodTable = pgTable("mood_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  mood: text("mood").notNull(),
  sleepHours: real("sleep_hours").notNull(),
  stressLevel: integer("stress_level").notNull(),
  workloadLevel: integer("workload_level").notNull(),
  notes: text("notes"),
  healthScore: integer("health_score").notNull().default(50),
  burnoutRisk: text("burnout_risk").notNull().default("low"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMoodSchema = createInsertSchema(moodTable).omit({ id: true, createdAt: true });
export type InsertMood = z.infer<typeof insertMoodSchema>;
export type MoodEntry = typeof moodTable.$inferSelect;
