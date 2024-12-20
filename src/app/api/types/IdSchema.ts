import { z } from 'zod';

export const IdSchema = z.object({
  id: z.number(),
});

export type IdSchemaInfer = z.infer<typeof IdSchema>;
