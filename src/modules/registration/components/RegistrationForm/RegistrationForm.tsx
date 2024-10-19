import { FC, useState } from 'react';
import { Form } from '@components/Form/Form.tsx';
import { Button, Flex, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { appPaths } from '../../../../app/routes';
import { registerUser } from '../../regUser.ts';
import { validateRegistration } from '../ValidateRegistration/validateRegistration.ts';

interface IRegistrationFormProps {
  onSuccess?: () => void;
}

export const RegistrationForm: FC<IRegistrationFormProps> = props => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: validateRegistration,
  });

  const handleRegistrationSubmit = async (values: typeof form.values) => {
    setLoading(true);
    const success = await registerUser(values);
    if (success) props.onSuccess?.();
    setLoading(false);
  };

  return (
    <Form
      title={'Заголовок'}
      isLoading={loading}
      link={{ href: appPaths.AUTHORIZATION, text: 'Уже есть аккаунт?' }}
    >
      <form onSubmit={form.onSubmit(handleRegistrationSubmit)}>
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
        <Flex justify="center">
          <Button
            type="submit"
            mt="xl"
            w={200}
            radius="md"
            color="blue"
            disabled={loading}
          >
            Зарегистрироваться
          </Button>
        </Flex>
      </form>
    </Form>
  );
};
