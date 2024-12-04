import { z } from 'zod';

export const ModuleSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  owner: z.number(),
  tags: z.array(
    z.object({
      tag: z.string(),
      color: z.string(),
    }),
  ),
});

export type ModuleSchemaInfer = z.infer<typeof ModuleSchema>;
