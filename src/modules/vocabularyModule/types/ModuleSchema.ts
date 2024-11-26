import { z } from 'zod';

export const ModuleSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  owner: z.number(),
});

export type ModuleSchemaInfer = z.infer<typeof ModuleSchema>;
