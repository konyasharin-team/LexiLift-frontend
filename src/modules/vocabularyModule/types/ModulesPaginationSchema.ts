import { PaginationContentSchema } from '@api/types/PaginationContentSchema.ts';
import {
  ModuleBackendSchema,
  ModuleSchema,
} from '@modules/vocabularyModule/types/ModuleSchema.ts';
import { z } from 'zod';

export const ModulesPaginationSchema = PaginationContentSchema(ModuleSchema);
export const ModulesPaginationBackendSchema =
  PaginationContentSchema(ModuleBackendSchema);

export type ModulesPaginationSchemaInfer = z.infer<
  typeof ModulesPaginationSchema
>;
export type ModulesPaginationBackendSchemaInfer = z.infer<
  typeof ModulesPaginationBackendSchema
>;
