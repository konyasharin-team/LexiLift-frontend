import { z } from 'zod';

export const TagSchema = z.object({
  tag: z.string(),
  fontColor: z.string(),
  backgroundColor: z.string(),
});
export const TagSchemaBackend = z.string();

export type TagSchemaInfer = z.infer<typeof TagSchema>;
export type TagSchemaBackend = z.infer<typeof TagSchemaBackend>;
