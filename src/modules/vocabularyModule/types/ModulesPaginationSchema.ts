import { PaginationContentSchema } from '@api/types/PaginationContentSchema.ts';
import { ModuleSchema } from '@modules/vocabularyModule/types/ModuleSchema.ts';
import { z } from 'zod';

export const ModulesPaginationSchema = PaginationContentSchema(ModuleSchema);

export type ModulesPaginationSchemaInfer = z.infer<
  typeof ModulesPaginationSchema
>;
