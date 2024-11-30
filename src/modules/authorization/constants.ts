import { RequestErrors } from '@api';
import { ChangePasswordErrorsSchemaInfer } from '@modules/authorization/types/ChangePasswordErrorsSchema.ts';
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

export const PASSWORD_PUT_ERRORS: RequestErrors<ChangePasswordErrorsSchemaInfer> =
  {
    INVALID_NEW_PASSWORD: 'Неверный формат ввода нового пароля',
    BAD_OLD_PASSWORD: 'Неверный старый пароль',
    OLD_AND_NEW_PASSWORDS_ARE_EQUALS:
      'Старый и новый пароли не должны быть одинаковыми',
  };
