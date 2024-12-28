import { DictionaryCardBackendSchema, DictionaryCardSchema } from '@app-types';
import { TagSchema, TagSchemaBackend } from '@modules/tags';
import { z } from 'zod';

export const ModuleSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  owner: z.number(),
  tags: z.array(TagSchema),
  words: z.array(DictionaryCardSchema),
});

export const ModuleBackendSchema = ModuleSchema.merge(
  z.object({
    words: z.array(DictionaryCardBackendSchema),
    tags: z.array(TagSchemaBackend),
  }),
);

export type ModuleSchemaInfer = z.infer<typeof ModuleSchema>;
export type ModuleBackendSchemaInfer = z.infer<typeof ModuleBackendSchema>;
