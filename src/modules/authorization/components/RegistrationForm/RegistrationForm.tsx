import { forwardRef } from 'react';
import { Form } from '@components/Form';
import { useI18N } from '@i18n';
import { Button, Flex, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRegistrationController } from '@modules/authorization';
import { validateRegistration } from '@modules/authorization/utils/validateRegistration.ts';
import { appPaths } from '@routes';

interface IRegistrationFormContentProps {
  controller: ReturnType<typeof useRegistrationController>;
}

export const RegistrationForm = forwardRef<
  HTMLDivElement,
  IRegistrationFormContentProps
>((props, ref) => {
  const { t } = useI18N();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: validateRegistration,
  });
  return (
    <Form
      ref={ref}
      title={t.registrationPage.registration}
      onSubmit={form.onSubmit(values => props.controller.sender.mutate(values))}
      link={{ href: appPaths.AUTHORIZATION, text: t.registrationPage.toLogin }}
      withWrapper={false}
    >
      <TextInput
        label={t.registrationPage.emailLabel}
        placeholder={t.registrationPage.emailPlaceholder}
        {...form.getInputProps('email')}
      />
      <PasswordInput
        label={t.registrationPage.passwordLabel}
        placeholder={t.registrationPage.passwordPlaceholder}
        {...form.getInputProps('password')}
        mt="md"
      />
      <PasswordInput
        label={t.registrationPage.repeatPasswordLabel}
        placeholder={t.registrationPage.repeatPasswordPlaceholder}
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
          disabled={props.controller.sender.isPending}
        >
          {t.registrationPage.registerButton}
        </Button>
      </Flex>
    </Form>
  );
});
