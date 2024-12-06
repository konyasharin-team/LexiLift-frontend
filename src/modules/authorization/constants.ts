import { RequestErrors } from '@api';
import { Resource } from '@i18n';
import { ChangePasswordErrorsSchemaInfer } from '@modules/authorization/types/ChangePasswordErrorsSchema.ts';
import { RegistrationErrorsSchemaInfer } from '@modules/authorization/types/RegistrationErrorsSchema.ts';

export const registrationSteps = {
  REGISTRATION: 'REGISTRATION',
  CONFIRM: 'CONFIRM',
} as const;

export const REGISTRATION_POST_ERRORS = (
  t: Resource,
): RequestErrors<RegistrationErrorsSchemaInfer> => ({
  INVALID_EMAIL: t.authorizationErrors.invalidEmail,
  INVALID_PASSWORD: t.authorizationErrors.invalidEmail,
  EMAIL_ALREADY_EXISTS: t.authorizationErrors.emailAlreadyExist,
});

export const PASSWORD_PUT_ERRORS = (
  t: Resource,
): RequestErrors<ChangePasswordErrorsSchemaInfer> => ({
  INVALID_NEW_PASSWORD: t.authorizationErrors.invalidNewPassword,
  BAD_OLD_PASSWORD: t.authorizationErrors.badOldPassword,
  OLD_AND_NEW_PASSWORDS_ARE_EQUALS:
    t.authorizationErrors.oldAndNewPasswordsAreEqual,
});
