import { regexp } from '@utils/regexpUtils.ts';

type LoginValues = {
  email: string;
  password: string;
};

export const validateLogin = (values: LoginValues) => {
  const errors: Partial<LoginValues> = {};

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

  return errors;
};
