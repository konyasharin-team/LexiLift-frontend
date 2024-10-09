import { regexp } from '../../../../app/utils/regexpUtils.ts';

type RegistrationValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const validateRegistration = (values: RegistrationValues) => {
  const errors: Partial<RegistrationValues> = {};

  if (!regexp.email.test(values.email)) {
    errors.email = 'Некорректный email';
  }

  if (values.password.length < 6) {
    errors.password = 'Пароль должен быть не менее 6 символов';
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Пароли должны совпадать';
  }

  return errors;
};

export const validateCode =
  (expectedCode: string) => (values: { code: string }) => {
    const errors: Partial<{ code: string }> = {};

    if (values.code !== expectedCode) {
      errors.code = 'Неверный код подтверждения';
    }

    return errors;
  };
