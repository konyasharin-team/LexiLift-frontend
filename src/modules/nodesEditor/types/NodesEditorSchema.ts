import { z } from 'zod';

export const NodesEditorSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type NodesEditorSchemaInfer = z.infer<typeof NodesEditorSchema>;
