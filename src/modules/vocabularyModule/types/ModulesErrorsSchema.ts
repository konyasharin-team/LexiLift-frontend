import { z } from 'zod';

export const ModulesErrorsSchema = z.union([
  z.literal('ACCESS_DENIED'),
  z.literal('NOT_FOUND'),
]);

export type ModulesErrorsSchemaInfer = z.infer<typeof ModulesErrorsSchema>;
