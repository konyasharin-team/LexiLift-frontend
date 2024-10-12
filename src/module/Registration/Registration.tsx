import { useState } from 'react';
import { Flex, LoadingOverlay, Paper, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { LinkItem } from '@ui/ Link/LinkItem.tsx';

import { appPaths } from '../../app/routes';

import { ConfirmationForm } from './components/ConfirmationForm/ConfirmationForm.tsx';
import { RegistrationForm } from './components/RegistrationForm/RegistrationForm.tsx';
import { registerUser } from './components/RegUser/regUser.ts';
import { validateCode } from './components/ValidateRegistration/validateConfirmation.ts';
import { validateRegistration } from './components/ValidateRegistration/validateRegistration.ts';

const registrationSteps = {
  REGISTRATION: 'REGISTRATION',
  CONFIRM: 'CONFIRM',
} as const;

type RegistrationStep = keyof typeof registrationSteps;

export default function Registration() {
  const [step, setStep] = useState<RegistrationStep>(
    registrationSteps.REGISTRATION,
  );
  const [loading, setLoading] = useState(false);

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
      expectedCode: '',
    },
    validate: validateCode,
  });

  const handleRegistrationSubmit = async (
    values: typeof registrationForm.values,
  ) => {
    setLoading(true);
    const success = await registerUser(values);
    if (success) {
      setStep(registrationSteps.CONFIRM);
    }
    setLoading(false);
  };

  const handleCodeSubmit = async (values: typeof confirmationForm.values) => {
    setLoading(true);
    if (values.expectedCode === '1234') {
      notifications.show({
        title: 'Успех',
        message: 'Аккаунт подтверждён!',
        color: 'green',
      });
    } else {
      notifications.show({
        title: 'Ошибка',
        message: 'Неверный код',
        color: 'red',
      });
    }
    setLoading(false);
  };

  return (
    <Flex justify="center">
      <Paper radius="lg" withBorder shadow="xl" p="xl" mt={120} w={700}>
        <Flex justify="center">
          <Title order={2} mb="md">
            {step === registrationSteps.REGISTRATION
              ? 'Регистрация'
              : 'Подтверждение аккаунта'}
          </Title>
        </Flex>

        {step === registrationSteps.REGISTRATION && (
          <RegistrationForm
            form={registrationForm}
            onSubmit={handleRegistrationSubmit}
            loading={loading}
          />
        )}
        {step === registrationSteps.CONFIRM && (
          <ConfirmationForm
            form={confirmationForm}
            onSubmit={handleCodeSubmit}
            loading={loading}
          />
        )}

        <LinkItem to={appPaths.AUTHORIZATION} label="Уже есть аккаунт?" />

        <LoadingOverlay visible={loading} />
      </Paper>
    </Flex>
  );
}
