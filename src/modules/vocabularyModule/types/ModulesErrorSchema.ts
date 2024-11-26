import { ErrorSchema } from '@api';
import { ModulesErrorsSchema } from '@modules/vocabularyModule/types/ModulesErrorsSchema.ts';
import { z } from 'zod';

export const ModulesErrorSchema = ErrorSchema(
  ModulesErrorsSchema,
  z.object({}),
);

export type ModulesErrorSchemaInfer = z.infer<typeof ModulesErrorSchema>;
