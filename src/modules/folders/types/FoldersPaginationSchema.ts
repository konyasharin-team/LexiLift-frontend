import { PaginationContentSchema } from '@api';
import { FolderSchema } from '@modules/folders';
import { z } from 'zod';

export const FoldersPaginationSchema = PaginationContentSchema(FolderSchema);

export type FoldersPaginationSchemaInfer = z.infer<
  typeof FoldersPaginationSchema
>;
