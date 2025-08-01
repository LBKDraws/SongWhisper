import { z } from "zod";

export const practiceCategories = ["daily", "weekly", "biweekly", "monthly", "learned"] as const;

export const songSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  notes: z.string().optional(),
  category: z.enum(practiceCategories),
  dateStarted: z.string(),
  dateCompleted: z.string().optional(),
});

export const insertSongSchema = songSchema.omit({ id: true });

export type Song = z.infer<typeof songSchema>;
export type InsertSong = z.infer<typeof insertSongSchema>;
export type PracticeCategory = typeof practiceCategories[number];
