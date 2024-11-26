import { FC } from 'react';
import { Form } from '@components/Form/Form.tsx';
import { Button, Flex, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLoginController } from '@modules/authorization/hooks/useLoginController.ts';
import { appPaths } from '@routes';

import { validateLogin } from '../../validations/validateLogin/validateLogin.ts';

interface IAuthorizationFormProps {
  loginController: ReturnType<typeof useLoginController>['loginController'];
}

export const AuthorizationForm: FC<IAuthorizationFormProps> = props => {
  const loginForm = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });

  return (
    <Form
      title={'Заголовок'}
      onSubmit={loginForm.onSubmit(values =>
        props.loginController.mutate(values),
      )}
      link={{
        href: appPaths.REGISTRATION,
        text: 'Нет аккаунта? Зарегистрируйся!',
      }}
    >
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
    </Form>
  );
};
