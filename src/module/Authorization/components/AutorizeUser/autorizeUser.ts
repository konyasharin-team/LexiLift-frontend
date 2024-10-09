export const loginUser = async (values: {
  email: string;
  password: string;
}) => {
  try {
    // Здесь вместо запроса просто выводим значения в консоль
    console.log('Попытка авторизации:', values);

    // Условие для симуляции успешной или неуспешной авторизации
    if (
      values.email === 'Zadolbalyse@yandex.ru' &&
      values.password === '6VtyZh7pyXFMTQe'
    ) {
      console.log('Авторизация успешна');
      return { message: 'Авторизация успешна', user: { email: values.email } };
    } else {
      console.log('Неверный email или пароль');
      return null;
    }
  } catch (error) {
    console.error('Ошибка авторизации:', error);
    return null;
  }
};
