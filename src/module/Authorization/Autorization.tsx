import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Flex,
  LoadingOverlay,
  Notification,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { appPaths } from '../../app/routes';

import { loginUser } from './components/AutorizeUser/autorizeUser.ts';
import { validateLogin } from './components/ValidateRegistration/validateLogin.ts';

import styles from '././Autorization.module.css';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loginForm = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });
  const [notificationVisible, setNotificationVisible] = useState(true);
  const [successNotificationVisible, setSuccessNotificationVisible] =
    useState(false);

  const handleLoginSubmit = async (values: typeof loginForm.values) => {
    setLoading(true);
    const user = await loginUser(values);

    if (user) {
      setSuccessNotificationVisible(true);
    } else {
      setError('Неверный email или пароль');
      setNotificationVisible(true);
    }
    setLoading(false);
  };

  return (
    <Flex justify="center">
      <Paper
        className={styles.formContainer}
        radius="lg"
        withBorder
        shadow="xl"
        p="xl"
        mt={150}
      >
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
            required
          />
          <PasswordInput
            label="Пароль"
            placeholder="Ваш пароль"
            {...loginForm.getInputProps('password')}
            required
            mt="md"
          />
          {error && notificationVisible && (
            <Notification
              color="red"
              title="Ошибка"
              mt="md"
              onClose={() => setNotificationVisible(false)}
            >
              {error}
            </Notification>
          )}
          {successNotificationVisible && (
            <Notification
              color="green"
              title="Успех"
              mt="md"
              onClose={() => setSuccessNotificationVisible(false)}
            >
              Авторизация успешна!
            </Notification>
          )}
          <Flex justify="center">
            <Button type="submit" mt="xl" w={200} radius="md" color="#89d8ef">
              Войти
            </Button>
          </Flex>
        </form>

        <Flex justify="center">
          <Text mt="md">
            Нет аккаунта?{' '}
            <Link to={appPaths.REGISTRATION} className={styles.link}>
              Зарегистрируйся!
            </Link>
          </Text>
        </Flex>

        <LoadingOverlay visible={loading} />
      </Paper>
    </Flex>
  );
}
