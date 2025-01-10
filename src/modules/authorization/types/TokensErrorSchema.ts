import { ErrorSchema } from '@api';
import { TokensErrorsSchema } from '@modules/authorization/types/TokensErrorsSchema.ts';
import { z } from 'zod';

export const TokensErrorSchema = ErrorSchema(TokensErrorsSchema, z.object({}));

export type TokensErrorSchemaInfer = z.infer<typeof TokensErrorSchema>;
