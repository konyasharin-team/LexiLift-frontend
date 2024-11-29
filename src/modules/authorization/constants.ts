import { RequestErrors } from '@api';
import { RegistrationErrorsSchemaInfer } from '@modules/authorization/types/RegistrationErrorsSchema.ts';

export const registrationSteps = {
  REGISTRATION: 'REGISTRATION',
  CONFIRM: 'CONFIRM',
} as const;

export const REGISTRATION_POST_ERRORS: RequestErrors<RegistrationErrorsSchemaInfer> =
  {
    INVALID_EMAIL: 'Неверный формат ввода электронной почты',
    INVALID_PASSWORD: 'Неверный формат ввода пароля',
    EMAIL_ALREADY_EXISTS:
      'Пользователь с такой электронной почтой уже существует',
  };
