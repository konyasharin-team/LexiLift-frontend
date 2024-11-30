import { FC } from 'react';
import { Form } from '@components/Form';
import { Button, Flex, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IChangePasswordData,
  useChangePasswordController,
} from '@modules/authorization';
import { validateNotRepeatPassword } from '@modules/authorization/utils/validateNotRepeatPassword.ts';
import { validatePassword } from '@modules/authorization/utils/validatePassword.ts';

interface IProfileChangePasswordFormProps {
  controller: ReturnType<typeof useChangePasswordController>;
}

export const ProfileChangePasswordForm: FC<
  IProfileChangePasswordFormProps
> = props => {
  const form = useForm<IChangePasswordData>({
    initialValues: {
      oldPassword: '',
      newPassword: '',
    },
    validate: {
      oldPassword: validatePassword,
      newPassword: (value, values) =>
        validateNotRepeatPassword(value, values.oldPassword),
    },
  });

  return (
    <Form
      onSubmit={form.onSubmit((values, event) => {
        event?.preventDefault();
        props.controller.sender.mutate(values);
      })}
      fullWidth={true}
    >
      <Flex justify={'space-between'} gap={20}>
        <PasswordInput
          {...form.getInputProps('oldPassword')}
          w={'100%'}
          placeholder={'Ваш старый пароль'}
        />
        <PasswordInput
          {...form.getInputProps('newPassword')}
          w={'100%'}
          placeholder={'Ваш новый пароль'}
        />
      </Flex>
      <Button
        type={'submit'}
        loading={props.controller.sender.isPending}
        mt={10}
        fullWidth={true}
      >
        Сохранить
      </Button>
    </Form>
  );
};
