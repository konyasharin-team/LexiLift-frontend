import { z } from 'zod';

export const LanguagesAbbrSchema = z.union([z.literal('ru'), z.literal('en')]);

export type LanguagesAbbrSchemaInfer = z.infer<typeof LanguagesAbbrSchema>;
