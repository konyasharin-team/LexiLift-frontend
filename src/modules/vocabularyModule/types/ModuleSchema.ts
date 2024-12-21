import { DictionaryCardBackendSchema, DictionaryCardSchema } from '@app-types';
import { z } from 'zod';

export const ModuleSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  owner: z.number(),
  tags: z.array(
    z.object({
      tag: z.string(),
      fontColor: z.string(),
      backgroundColor: z.string(),
    }),
  ),
  words: z.array(DictionaryCardSchema),
});

export const ModuleBackendSchema = ModuleSchema.merge(
  z.object({
    words: z.array(DictionaryCardBackendSchema),
  }),
);

export type ModuleSchemaInfer = z.infer<typeof ModuleSchema>;
export type ModuleBackendSchemaInfer = z.infer<typeof ModuleBackendSchema>;
