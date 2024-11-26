import { FC } from 'react';
import { Form } from '@components/Form';
import { Button, Flex, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useChangePasswordController } from '@modules/authorization';
import { appPaths } from '@routes';

interface IPasswordResetFormProps {
  passwordController: ReturnType<typeof useChangePasswordController>;
  errorText?: string;
}

export const PasswordResetForm: FC<IPasswordResetFormProps> = props => {
  const resetPasswordForm = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
    },
    validate: {
      oldPassword: value =>
        value.length < 6 ? 'Пароль должен быть не менее 6 символов' : null,
      newPassword: value =>
        value.length < 6 ? 'Пароль должен быть не менее 6 символов' : null,
    },
  });
  return (
    <Form
      title="Смена пароля"
      onSubmit={resetPasswordForm.onSubmit(values =>
        props.passwordController.sender.mutate(values),
      )}
      link={{
        href: appPaths.AUTHORIZATION,
        text: 'Вернуться ко входу',
      }}
    >
      <PasswordInput
        label="Текущий пароль"
        placeholder="Введите текущий пароль"
        {...resetPasswordForm.getInputProps('oldPassword')}
        mt="md"
      />
      <PasswordInput
        label="Новый пароль"
        placeholder="Введите новый пароль"
        {...resetPasswordForm.getInputProps('newPassword')}
        mt="md"
      />
      <Flex justify="center">
        <Button type="submit" mt="xl" w={200} radius="md" color="green">
          Сменить пароль
        </Button>
      </Flex>{' '}
    </Form>
  );
};
