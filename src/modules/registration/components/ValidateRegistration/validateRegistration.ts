import { regexp } from '@utils/regexpUtils.ts';

interface IRegistrationValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export const validateRegistration = (values: IRegistrationValues) => {
  const errors: Partial<IRegistrationValues> = {};

  if (!values.email) {
    errors.email = 'Поле email обязательно для заполнения';
  } else if (!regexp.email.test(values.email)) {
    errors.email = 'Некорректный email';
  }

  if (!values.password) {
    errors.password = 'Поле пароля обязательно для заполнения';
  } else if (values.password.length < 6) {
    errors.password = 'Пароль должен быть не менее 6 символов';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword =
      'Поле подтверждения пароля обязательно для заполнения';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Пароли должны совпадать';
  }

  return errors;
};
