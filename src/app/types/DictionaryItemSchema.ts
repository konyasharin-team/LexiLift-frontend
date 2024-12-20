import { z } from 'zod';

export const DictionaryItemSchema = z.object({
  id: z.number(),
  word: z.string(),
  translation: z.string(),
});

export type DictionaryItemSchemaInfer = z.infer<typeof DictionaryItemSchema>;
