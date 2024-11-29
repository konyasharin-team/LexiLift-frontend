import { ErrorSchema } from '@api';
import { FoldersErrorsSchema } from '@modules/folders';
import { z } from 'zod';

export const FoldersErrorSchema = ErrorSchema(
  FoldersErrorsSchema,
  z.object({}),
);

export type FolderErrorSchemaInfer = z.infer<typeof FoldersErrorSchema>;
