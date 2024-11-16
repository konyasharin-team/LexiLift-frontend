import { FC, useEffect } from 'react';
import { getErrorText } from '@api';
import { Form } from '@components/Form/Form.tsx';
import { Button, Flex, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  REGISTRATION_POST_ERRORS,
  useRegistrationRequests,
} from '@modules/registration';
import { appPaths } from '@routes';

import { validateRegistration } from '../ValidateRegistration/validateRegistration.ts';

interface IRegistrationFormProps {
  onSuccess?: () => void;
}

export const RegistrationForm: FC<IRegistrationFormProps> = props => {
  const { controller, apiError } = useRegistrationRequests();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: validateRegistration,
  });

  useEffect(() => {
    if (controller.isSuccess) props.onSuccess?.();
  }, [controller.isSuccess]);

  return (
    <Form
      title={'Заголовок'}
      isLoading={controller.isPending}
      onSubmit={form.onSubmit(values => controller.mutate(values))}
      link={{ href: appPaths.AUTHORIZATION, text: 'Уже есть аккаунт?' }}
    >
      <TextInput
        label="Email"
        placeholder="Ваш email"
        {...form.getInputProps('email')}
      />
      <PasswordInput
        label="Пароль"
        placeholder="Ваш пароль"
        {...form.getInputProps('password')}
        mt="md"
      />
      <PasswordInput
        label="Подтвердите пароль"
        placeholder="Повторите пароль"
        {...form.getInputProps('confirmPassword')}
        mt="md"
      />
      {apiError ? (
        <Text c={'red'}>
          {getErrorText(apiError.type, REGISTRATION_POST_ERRORS)}
        </Text>
      ) : undefined}
      <Flex justify="center">
        <Button
          type="submit"
          mt="xl"
          w={200}
          radius="md"
          color="blue"
          disabled={controller.isPending}
        >
          Зарегистрироваться
        </Button>
      </Flex>
    </Form>
  );
};
