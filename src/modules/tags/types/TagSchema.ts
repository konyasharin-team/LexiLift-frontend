import { z } from 'zod';

export const TagSchema = z.object({
  tag: z.string(),
  fontColor: z.string(),
  backgroundColor: z.string(),
});

export const TagSchemaBackend = TagSchema.omit({ tag: true }).merge(
  z.object({
    name: z.string(),
  }),
);

export type TagSchemaInfer = z.infer<typeof TagSchema>;
export type TagSchemaBackendInfer = z.infer<typeof TagSchemaBackend>;
