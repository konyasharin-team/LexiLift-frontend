import { z } from 'zod';

export const RegistrationErrorsSchema = z.union([
  z.literal('INVALID_EMAIL'),
  z.literal('EMAIL_ALREADY_EXISTS'),
  z.literal('INVALID_PASSWORD'),
]);

export type RegistrationErrorsSchemaInfer = z.infer<
  typeof RegistrationErrorsSchema
>;
