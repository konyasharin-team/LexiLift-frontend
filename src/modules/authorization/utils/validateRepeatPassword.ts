import { validatePassword } from '@modules/authorization/utils/validatePassword.ts';

export const validateRepeatPassword = (value: string, other: string) => {
  const baseValidate = validatePassword(value);
  if (baseValidate) return baseValidate;
  if (other !== value) return 'Пароли должны совпадать';
};
