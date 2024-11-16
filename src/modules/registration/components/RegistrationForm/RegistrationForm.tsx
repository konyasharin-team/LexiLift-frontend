import { FC, useEffect } from 'react';
import { getErrorText } from '@api';
import { Form } from '@components/Form/Form.tsx';
import { Button, Flex, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  REGISTRATION_POST_ERRORS,
  useRegistrationRequests,
} from '@modules/registration';
import { appPaths } from '@routes';

import { validateRegistration } from '../ValidateRegistration/validateRegistration.ts';

interface IRegistrationFormProps {
  onSuccess?: () => void;
}

export const RegistrationForm: FC<IRegistrationFormProps> = props => {
  const { controller, apiError } = useRegistrationRequests();
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
          <CenterFlex
            ref={element => {
              if (element) blockRefs.current[1] = element;
            }}
          >
            <Loader />
          </CenterFlex>
        ),
        position: 'right',
        key: '2',
      },
    ],
    [form.values],
  );

  useEffect(() => {
    if (controller.isSuccess) props.onSuccess?.();
  }, [controller.isSuccess]);

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
