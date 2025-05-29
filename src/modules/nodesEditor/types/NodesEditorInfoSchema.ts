import { z } from 'zod';

export const NodesEditorInfoSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type NodesEditorInfoSchemaInfer = z.infer<typeof NodesEditorInfoSchema>;
