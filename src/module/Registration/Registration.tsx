import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Flex,
  LoadingOverlay,
  Notification,
  Paper,
  PasswordInput,
  PinInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { appPaths } from '../../app/routes';

import { registerUser } from './components/RegUser/regUser.ts';
import {
  validateCode,
  validateRegistration,
} from './components/ValidateRegistration/validateRegistration.ts';

import styles from '../Authorization/Autorization.module.css';

export default function Registration() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [confirmationCode] = useState('1234');
  const [error, setError] = useState('');
  const [notificationVisible, setNotificationVisible] = useState(true);
  const [successNotificationVisible, setSuccessNotificationVisible] =
    useState(false);
  const [notificationClass, setNotificationClass] = useState('');

  const registrationForm = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: validateRegistration,
  });

  const confirmationForm = useForm({
    initialValues: {
      code: '',
    },
    validate: validateCode(confirmationCode),
  });

  const handleRegistrationSubmit = async (
    values: typeof registrationForm.values,
  ) => {
    setLoading(true);
    const success = await registerUser(values);
    if (success) {
      setStep(2);
    }
    setLoading(false);
  };

  const handleCodeSubmit = async (values: typeof confirmationForm.values) => {
    setLoading(true);
    if (values.code === confirmationCode) {
      setSuccessNotificationVisible(true);
      setNotificationClass('fade-in'); // Добавляем класс для уведомления
      setTimeout(() => setNotificationClass(''), 3000);
    } else {
      setError('Неверный код');
    }
    setLoading(false);
  };

  return (
    <Paper
      className={styles.formContainer}
      radius="lg"
      withBorder
      shadow="xl"
      p="xl"
      mt={120}
    >
      <Flex justify="center">
        <Title order={2} mb="md">
          {step === 1 ? 'Регистрация' : 'Подтверждение аккаунта'}
        </Title>
      </Flex>

      {step === 1 && (
        <form onSubmit={registrationForm.onSubmit(handleRegistrationSubmit)}>
          <TextInput
            label="Email"
            placeholder="Ваш email"
            {...registrationForm.getInputProps('email')}
            required
          />
          <PasswordInput
            label="Пароль"
            placeholder="Ваш пароль"
            {...registrationForm.getInputProps('password')}
            required
            mt="md"
          />
          <PasswordInput
            label="Подтвердите пароль"
            placeholder="Повторите пароль"
            {...registrationForm.getInputProps('confirmPassword')}
            required
            mt="md"
          />
          <Flex justify="center">
            <Button type="submit" mt="xl" w={200} radius="md" color="#89d8ef">
              Зарегистрироваться
            </Button>
          </Flex>
        </form>
      )}
      {step === 2 && (
        <>
          {notificationVisible && (
            <Notification
              color="green"
              title="Код отправлен"
              mb="md"
              onClose={() => setNotificationVisible(false)}
            >
              Мы отправили код подтверждения на ваш email.
            </Notification>
          )}

          {successNotificationVisible && (
            <Notification
              color="green"
              title="Успех"
              className={`${notificationClass}`} // Класс для анимации
              mt="md"
              onClose={() => setSuccessNotificationVisible(false)}
            >
              Аккаунт подтверждён!
            </Notification>
          )}

          <form onSubmit={confirmationForm.onSubmit(handleCodeSubmit)}>
            <Flex justify="center">
              <PinInput
                length={4}
                ariaLabel="Введите код"
                {...confirmationForm.getInputProps('code')}
                aria-required
                mt="md"
              />
            </Flex>
            {error && (
              <Notification color="red" title="Ошибка" mt="md">
                {error}
              </Notification>
            )}
            <Flex justify="center">
              <Button type="submit" mt="xl" w={200} radius="md" color="#89d8ef">
                Подтвердить код
              </Button>
            </Flex>
          </form>
        </>
      )}

      <Flex justify="center">
        <Text mt="md">
          <Link to={appPaths.AUTORIZATION} className={styles.link}>
            Уже есть аккаунт?
          </Link>
        </Text>
      </Flex>

      <LoadingOverlay visible={loading} />
    </Paper>
  );
}
