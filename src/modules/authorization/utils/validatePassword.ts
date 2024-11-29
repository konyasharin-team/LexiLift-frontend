export const validatePassword = (password: string) => {
  if (password.length === 0) return 'Поле пароля обязательно для заполнения';
  if (password.length < 5)
    return 'Пароль должен содержать как минимум 5 символов';
};
