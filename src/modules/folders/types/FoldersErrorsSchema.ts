import { z } from 'zod';

export const FoldersErrorsSchema = z.union([
  z.literal('ACCESS_DENIED'),
  z.literal('NOT_FOUND'),
]);

export type FoldersErrorsSchemaInfer = z.infer<typeof FoldersErrorsSchema>;
