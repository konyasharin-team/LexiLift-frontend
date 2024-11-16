import { FC, useEffect } from 'react';
import { getErrorText } from '@api';
import {
  AnimatedChanger,
  useAnimatedChanger,
} from '@components/AnimatedChanger';
import { Form } from '@components/Form/Form.tsx';
import { Box, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  REGISTRATION_POST_ERRORS,
  useRegistrationRequests,
} from '@modules/registration';
import { RegistrationFormContent } from '@modules/registration/components/RegistrationFormContent/RegistrationFormContent.tsx';
import { appPaths } from '@routes';
import { CenterFlex } from '@ui/CenterFlex';

import { validateRegistration } from '../../utils/validateRegistration';

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

  const { content, setPositionsByKey } = useAnimatedChanger(
    [
      {
        element: (
          <RegistrationFormContent
            form={form}
            isPending={controller.isPending}
            errorText={
              apiError
                ? getErrorText(apiError?.type, REGISTRATION_POST_ERRORS)
                : undefined
            }
          />
        ),
        position: 'center',
        key: '1',
      },
      {
        element: (
          <Box h={200}>
            <CenterFlex>
              <Loader />
            </CenterFlex>
          </Box>
        ),
        position: 'right',
        key: '2',
      },
    ],
    [form.values, apiError?.type],
  );

  useEffect(() => {
    if (controller.isSuccess) props.onSuccess?.();
  }, [controller.isSuccess]);

  useEffect(() => {
    if (controller.isPending) {
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
  }, [controller.isPending]);

  return (
    <Form
      title={'Регистрация'}
      onSubmit={form.onSubmit(values => controller.mutate(values))}
      link={{ href: appPaths.AUTHORIZATION, text: 'Уже есть аккаунт?' }}
    >
      <AnimatedChanger content={content} />
    </Form>
  );
};
