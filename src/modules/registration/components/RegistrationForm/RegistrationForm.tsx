import { FC, useEffect } from 'react';
import { useMutation } from 'react-query';
import { IAuthData } from '@app-types/IAuthData.ts';
import { Form } from '@components/Form/Form.tsx';
import { Button, Flex, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { AuthApi } from '../../../../app/api/AuthApi.ts';
import { appPaths } from '../../../../app/routes';
import { validateRegistration } from '../ValidateRegistration/validateRegistration.ts';

interface IRegistrationFormProps {
  onSuccess?: () => void;
}

export const RegistrationForm: FC<IRegistrationFormProps> = props => {
  const { mutate: postRegistration, isLoading, isSuccess } = useMutation(
    async (data: IAuthData) => {
      return await AuthApi.PostRegistration(data);
    },
  );

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: validateRegistration,
  });

  useEffect(() => {
    if (isSuccess) props.onSuccess?.();
  }, [isSuccess]);

  return (
    <Form
      title={'Заголовок'}
      isLoading={isLoading}
      link={{ href: appPaths.AUTHORIZATION, text: 'Уже есть аккаунт?' }}
    >
      <form onSubmit={form.onSubmit(values => postRegistration(values))}>
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
            disabled={isLoading}
          >
            Зарегистрироваться
          </Button>
        </Flex>
      </form>
    </Form>
  );
};
