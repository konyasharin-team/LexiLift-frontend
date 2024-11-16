import { forwardRef } from 'react';
import { Button, Flex, PasswordInput, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IRegistrationForm } from '@modules/registration/types/IRegistrationForm.ts';

interface IRegistrationFormContentProps {
  form: UseFormReturnType<IRegistrationForm>;
  isPending: boolean;
  errorText?: string;
}

export const RegistrationFormContent = forwardRef<
  HTMLDivElement,
  IRegistrationFormContentProps
>((props, ref) => {
  return (
    <div ref={ref}>
      <TextInput
        label="Email"
        placeholder="Ваш email"
        {...props.form.getInputProps('email')}
      />
      <PasswordInput
        label="Пароль"
        placeholder="Ваш пароль"
        {...props.form.getInputProps('password')}
        mt="md"
      />
      <PasswordInput
        label="Подтвердите пароль"
        placeholder="Повторите пароль"
        {...props.form.getInputProps('confirmPassword')}
        mt="md"
      />
      <Flex justify="center">
        <Button
          type="submit"
          mt="xl"
          w={200}
          radius="md"
          color="blue"
          disabled={props.isPending}
        >
          Зарегистрироваться
        </Button>
      </Flex>
      <Text c={'red'}>{props.errorText}</Text>
    </div>
  );
});
