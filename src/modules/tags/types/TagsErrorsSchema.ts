import { z } from 'zod';

export const TagsErrorsSchema = z.string();
export type TagsErrorsSchemaInfer = z.infer<typeof TagsErrorsSchema>;
