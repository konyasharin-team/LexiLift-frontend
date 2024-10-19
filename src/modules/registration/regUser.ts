type RegistrationValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const registerUser = async (
  values: RegistrationValues,
): Promise<boolean> => {
  // Имитация отправки данных на сервер
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Регистрация пользователя', values);
      resolve(true);
    }, 2000);
  });
};
