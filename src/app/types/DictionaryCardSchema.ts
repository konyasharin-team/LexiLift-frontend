import { DictionaryItemSchema } from '@app-types/DictionaryItemSchema.ts';
import { z } from 'zod';

export const DictionaryCardSchema = DictionaryItemSchema.merge(
  z.object({
    img: z.union([z.string(), z.undefined()]),
  }),
);

export const DictionaryCardBackendSchema = z.object({
  id: z.number(),
  word: z.string(),
  description: z.string(),
  pictureUrl: z.string(),
});

export type DictionaryCardSchemaInfer = z.infer<typeof DictionaryCardSchema>;
export type DictionaryCardBackendSchemaInfer = z.infer<
  typeof DictionaryCardSchema
>;
