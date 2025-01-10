import { z } from 'zod';

export const SuccessSchema = z.object({
  success: z.boolean(),
});

export type SuccessSchemaInfer = z.infer<typeof SuccessSchema>;
