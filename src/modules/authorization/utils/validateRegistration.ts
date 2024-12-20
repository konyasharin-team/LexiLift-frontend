import { validatePassword } from '@modules/authorization/utils/validatePassword.ts';
import { validateRepeatPassword } from '@modules/authorization/utils/validateRepeatPassword.ts';
import { regexp } from '@utils';

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

  errors.password = validatePassword(values.password);
  errors.confirmPassword = validateRepeatPassword(
    values.confirmPassword,
    values.password,
  );

  return errors;
};
