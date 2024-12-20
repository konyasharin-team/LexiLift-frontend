import { z } from 'zod';

export const FolderSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  owner: z.number(),
});

export type FolderSchemaInfer = z.infer<typeof FolderSchema>;
