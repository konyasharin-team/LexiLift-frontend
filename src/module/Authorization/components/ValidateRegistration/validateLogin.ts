import { regexp } from '../../../../app/utils/regexpUtils.ts'; // Импорт регулярного выражения

type LoginValues = {
  email: string;
  password: string;
};

export const validateLogin = (values: LoginValues) => {
  const errors: Partial<LoginValues> = {};

  // Валидация email
  if (!regexp.email.test(values.email)) {
    errors.email = 'Некорректный email';
  }

  // Валидация пароля (проверка на наличие пароля)
  if (values.password.length < 6) {
    errors.password = 'Пароль должен быть не менее 6 символов';
  }

  return errors;
};
