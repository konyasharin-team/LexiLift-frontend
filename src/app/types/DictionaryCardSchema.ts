import { DictionaryItemSchema } from '@app-types/DictionaryItemSchema.ts';
import { z } from 'zod';

export const DictionaryCardSchema = DictionaryItemSchema.merge(
  z.object({
    img: z.union([z.string(), z.undefined()]),
  }),
);

export type DictionaryCardSchemaInfer = z.infer<typeof DictionaryCardSchema>;
