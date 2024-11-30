import { validatePassword } from '@modules/authorization/utils/validatePassword.ts';

export const validateNotRepeatPassword = (value: string, other: string) => {
  const baseValidate = validatePassword(value);
  if (baseValidate) return baseValidate;
  if (other === value) return 'Пароли не должны совпадать';
};
