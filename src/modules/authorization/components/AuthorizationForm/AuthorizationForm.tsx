import { FC } from 'react';
import { pendingToLoading, useRequestEvents } from '@api';
import { Form } from '@components/Form/Form.tsx';
import { Button, Flex, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLoginController } from '@modules/authorization/hooks/useLoginController.ts';
import { appPaths } from '@routes';
import { useActions } from '@store';

import { validateLogin } from '../../utils/validateLogin.ts';

interface IAuthorizationFormProps {
  loginController: ReturnType<typeof useLoginController>;
}

export const AuthorizationForm: FC<IAuthorizationFormProps> = props => {
  const { setTokens } = useActions();
  const loginForm = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });

  useRequestEvents(pendingToLoading(props.loginController.sender), {
    onSuccess: setTokens,
  });

  return (
    <Form
      title={'Заголовок'}
      onSubmit={loginForm.onSubmit(values =>
        props.loginController.sender.mutate(values),
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

      <Flex justify="center" gap={20}>
        <Button
          type="submit"
          mt="xl"
          w={200}
          radius="md"
          color="blue"
          loading={props.loginController.sender.isPending}
        >
          Войти
        </Button>
      </Flex>
    </Form>
  );
};
