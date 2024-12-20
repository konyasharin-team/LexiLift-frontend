import { validatePassword } from '@modules/authorization/utils/validatePassword.ts';
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

  errors.password = validatePassword(values.password);

  return errors;
};
