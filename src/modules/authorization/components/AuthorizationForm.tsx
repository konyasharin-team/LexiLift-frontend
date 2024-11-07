import { FC, useState } from 'react';
import { Form } from '@components/Form/Form.tsx';
import { Button, Flex, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { appPaths } from '@routes';

import { loginUser } from '../autorizeUser.ts';
import { validateLogin } from '../validations/validateLogin/validateLogin.ts';

export const AuthorizationForm: FC = () => {
  const [loading, setLoading] = useState(false);

  const loginForm = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });

  const handleLoginSubmit = async (values: typeof loginForm.values) => {
    setLoading(true);
    const user = await loginUser(values);

    if (user) {
      notifications.show({
        title: 'Успех',
        message: 'Вы авторизовались',
        color: 'green',
      });
    } else {
      notifications.show({
        title: 'Ошибка',
        message: 'Указан неверный логин или пароль',
        color: 'red',
      });
    }
    setLoading(false);
  };

  return (
    <Form
      title={'Заголовок'}
      isLoading={loading}
      link={{
        href: appPaths.REGISTRATION,
        text: 'Нет аккаунта? Зарегистрируйся!',
      }}
    >
      <form onSubmit={loginForm.onSubmit(handleLoginSubmit)}>
        <TextInput
          label="Email"
          placeholder="Ваш email"
          {...loginForm.getInputProps('email')}
        />
        <PasswordInput
          label="Пароль"
          placeholder="Ваш пароль"
          {...loginForm.getInputProps('password')}
          mt="md"
        />

        <Flex justify="center">
          <Button type="submit" mt="xl" w={200} radius="md" color="blue">
            Войти
          </Button>
        </Flex>
      </form>
    </Form>
  );
};
