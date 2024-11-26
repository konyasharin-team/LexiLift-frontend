import { z } from 'zod';

export const ChangePasswordErrorsSchema = z.union([
  z.literal('BAD_OLD_PASSWORD'),
  z.literal('INVALID_NEW_PASSWORD'),
  z.literal('OLD_AND_NEW_PASSWORDS_ARE_EQUALS'),
]);

export type ChangePasswordErrorsSchemaInfer = z.infer<
  typeof ChangePasswordErrorsSchema
>;
