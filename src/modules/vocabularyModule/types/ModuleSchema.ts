import { DictionaryCardSchema } from '@app-types';
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
  cards: z.array(DictionaryCardSchema),
});

export type ModuleSchemaInfer = z.infer<typeof ModuleSchema>;
