import { forwardRef } from 'react';
import { Form } from '@components/Form';
import { Button, Flex, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRegistrationController } from '@modules/authorization';
import { validateRegistration } from '@modules/authorization/utils/validateRegistration.ts';
import { appPaths } from '@routes';

interface IRegistrationFormContentProps {
  controller: ReturnType<typeof useRegistrationController>;
  errorText?: string;
}

export const RegistrationForm = forwardRef<
  HTMLDivElement,
  IRegistrationFormContentProps
>((props, ref) => {
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
      title="Регистрация"
      onSubmit={form.onSubmit(values => props.controller.sender.mutate(values))}
      link={{ href: appPaths.AUTHORIZATION, text: 'Уже есть аккаунт?' }}
      withWrapper={false}
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
      <Flex justify="center">
        <Button
          type="submit"
          mt="xl"
          w={200}
          radius="md"
          color="blue"
          disabled={props.controller.sender.isPending}
        >
          Зарегистрироваться
        </Button>
      </Flex>
      <Text c={'red'}>{props.errorText}</Text>
    </Form>
  );
});
