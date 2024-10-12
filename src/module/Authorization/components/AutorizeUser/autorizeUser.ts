export const loginUser = async (values: {
  email: string;
  password: string;
}) => {
  try {
    if (
      values.email === 'Zadolbalyse@yandex.ru' &&
      values.password === '6VtyZh7pyXFMTQe'
    ) {
      return { message: 'Авторизация успешна', user: { email: values.email } };
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
