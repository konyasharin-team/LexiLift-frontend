import { FC, useEffect } from 'react';
import { AuthApi } from '@api';
import { IAuthData } from '@app-types';
import {
  AnimatedChanger,
  useAnimatedChanger,
} from '@components/AnimatedChanger';
import { Form } from '@components/Form/Form.tsx';
import { useMaxHeight } from '@hooks';
import { Center, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import { RegistrationFormContent } from '@modules/registration/components/RegistrationFormContent/RegistrationFormContent.tsx';
import { validateRegistration } from '@modules/registration/utils/validateRegistration.ts';
import { appPaths } from '@routes';
import { useMutation } from '@tanstack/react-query';

interface IRegistrationFormProps {
  onSuccess?: () => void;
}

export const RegistrationForm: FC<IRegistrationFormProps> = props => {
  const {
    mutate: postRegistration,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: IAuthData) => await AuthApi.PostRegistration(data),
  });

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: validateRegistration,
  });

  const { maxHeight, blockRefs } = useMaxHeight();

  const { content, setPositionsByKey } = useAnimatedChanger(
    [
      {
        element: (
          <RegistrationFormContent
            form={form}
            isPending={isPending}
            ref={element => {
              if (element) blockRefs.current[0] = element;
            }}
          />
        ),
        position: 'center',
        key: '1',
      },
      {
        element: (
          <Center
            ref={element => {
              if (element) blockRefs.current[1] = element;
            }}
          >
            <Loader />
          </Center>
        ),
        position: 'right',
        key: '2',
      },
    ],
    [form.values],
  );

  useEffect(() => {
    if (isSuccess) props.onSuccess?.();
  }, [isSuccess]);

  useEffect(() => {
    if (isPending) {
      setPositionsByKey([
        { key: '2', newPosition: 'center' },
        { key: '1', newPosition: 'left' },
      ]);
    } else {
      setPositionsByKey([
        { key: '2', newPosition: 'right' },
        { key: '1', newPosition: 'center' },
      ]);
    }
  }, [isPending]);

  return (
    <Form
      title={'Регистрация'}
      onSubmit={form.onSubmit(values => postRegistration(values))}
      link={{ href: appPaths.AUTHORIZATION, text: 'Уже есть аккаунт?' }}
    >
      <AnimatedChanger content={content} maxHeight={maxHeight} />
    </Form>
  );
};
