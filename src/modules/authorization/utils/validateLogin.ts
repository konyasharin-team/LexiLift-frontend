import { regexp } from '@utils';

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
  } else if (values.password.length < 5) {
    errors.password = 'Пароль должен быть не менее 5 символов';
  }

  return errors;
};
