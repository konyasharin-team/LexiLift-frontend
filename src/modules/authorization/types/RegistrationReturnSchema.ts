import { z } from 'zod';

export const RegistrationReturnSchema = z.object({
  userId: z.number(),
});

export type RegistrationReturnSchemaInfer = z.infer<
  typeof RegistrationReturnSchema
>;
