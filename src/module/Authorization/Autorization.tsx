import { useState } from 'react';
import {
  Button,
  Flex,
  LoadingOverlay,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { LinkItem } from '@ui/ Link/LinkItem.tsx';

import { appPaths } from '../../app/routes';

import { loginUser } from './components/AutorizeUser/autorizeUser.ts';
import { validateLogin } from './components/ValidateLogin/validateLogin.ts';

export default function Login() {
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
    <Flex justify="center">
      <Paper radius="lg" withBorder shadow="xl" p="xl" mt={150} w={700}>
        <Flex justify="center">
          <Title order={2} mb="md">
            Авторизация
          </Title>
        </Flex>

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

        <LinkItem
          to={appPaths.REGISTRATION}
          label="Нет аккаунта? Зарегистрируйся!"
        />

        <LoadingOverlay visible={loading} />
      </Paper>
    </Flex>
  );
}
