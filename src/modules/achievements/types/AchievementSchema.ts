import { z } from 'zod';

export const AchievementSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
});

export type AchievementSchemaInfer = z.infer<typeof AchievementSchema>;
