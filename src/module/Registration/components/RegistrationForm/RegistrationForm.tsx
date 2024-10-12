import { Button, Flex, PasswordInput, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

interface IRegistrationFormProps {
  form: UseFormReturnType<{
    email: string;
    password: string;
    confirmPassword: string;
  }>;
  onSubmit: (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  loading: boolean;
}

export function RegistrationForm({
  form,
  onSubmit,
  loading,
}: IRegistrationFormProps) {
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
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
  );
}
