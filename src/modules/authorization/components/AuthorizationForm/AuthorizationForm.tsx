import { FC } from 'react';
import { pendingToLoading, useRequestEvents } from '@api';
import { Form } from '@components/Form/Form.tsx';
import { useI18N } from '@i18n';
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
  const { t } = useI18N();
  const { setTokens } = useActions();
  const loginForm = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });

  useRequestEvents(pendingToLoading(props.loginController.sender), {
    onSuccess: result => {
      if (result) setTokens(result);
    },
  });

  return (
    <Form
      title={t.authorizationPage.authorization}
      onSubmit={loginForm.onSubmit(values =>
        props.loginController.sender.mutate(values),
      )}
      link={{
        href: appPaths.REGISTRATION,
        text: t.authorizationPage.toRegistration,
      }}
    >
      <TextInput
        label={t.authorizationPage.emailLabel}
        placeholder={t.authorizationPage.emailPlaceholder}
        {...loginForm.getInputProps('email')}
      />
      <PasswordInput
        label={t.authorizationPage.passwordLabel}
        placeholder={t.authorizationPage.passwordPlaceholder}
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
          {t.authorizationPage.loginButton}
        </Button>
      </Flex>
    </Form>
  );
};
