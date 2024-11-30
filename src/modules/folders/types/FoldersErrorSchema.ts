import { ErrorSchema } from '@api';
import { z } from 'zod';

import { FoldersErrorsSchema } from './FoldersErrorsSchema';

export const FoldersErrorSchema = ErrorSchema(
  FoldersErrorsSchema,
  z.object({}),
);

export type FolderErrorSchemaInfer = z.infer<typeof FoldersErrorSchema>;
