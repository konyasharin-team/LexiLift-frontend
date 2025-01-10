import { z } from 'zod';

export const TokensErrorsSchema = z.union([
  z.literal('TOKEN_NOT_VALID'),
  z.literal('TOKEN_EXPIRED'),
]);

export type TokensErrorsSchemaInfer = z.infer<typeof TokensErrorsSchema>;
