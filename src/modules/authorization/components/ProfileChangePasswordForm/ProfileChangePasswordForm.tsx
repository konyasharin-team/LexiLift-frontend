import { FC } from 'react';
import { Button, Flex, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IChangePasswordData,
  useChangePasswordController,
} from '@modules/authorization';
import { validatePassword } from '@modules/authorization/utils/validatePassword.ts';
import { validateRepeatPassword } from '@modules/authorization/utils/validateRepeatPassword.ts';

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
        validateRepeatPassword(value, values.oldPassword),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values, event) => {
        event?.preventDefault();
        props.controller.sender.mutate(values);
      })}
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
    </form>
  );
};
