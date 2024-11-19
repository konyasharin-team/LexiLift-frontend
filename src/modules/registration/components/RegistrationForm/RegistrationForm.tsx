import { FC, useEffect } from 'react';
import { getErrorText } from '@api';
import {
  AnimatedChanger,
  AnimatedChangerItem,
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
import { IconCircleCheckFilled } from '@tabler/icons-react';
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

  const { content, setPositionsByKey, getPositionByKey } = useAnimatedChanger([
    {
      position: 'center',
      key: 'REGISTRATION_FORM',
    },
    {
      position: 'right',
      key: 'REGISTRATION_LOADING',
    },
    {
      position: 'right',
      key: 'REGISTRATION_SUCCESS',
    },
  ]);

  useEffect(() => {
    if (controller.isSuccess) {
      setPositionsByKey([
        { key: 'REGISTRATION_LOADING', newPosition: 'left' },
        { key: 'REGISTRATION_SUCCESS', newPosition: 'center' },
      ]);
      // props.onSuccess?.();
    }
  }, [controller.isSuccess]);

  useEffect(() => {
    if (controller.isPending) {
      setPositionsByKey([
        { key: 'REGISTRATION_LOADING', newPosition: 'center' },
        { key: 'REGISTRATION_FORM', newPosition: 'left' },
      ]);
    } else if (controller.isError) {
      setPositionsByKey([
        { key: 'REGISTRATION_LOADING', newPosition: 'right' },
        { key: 'REGISTRATION_FORM', newPosition: 'center' },
      ]);
    }
  }, [controller.isPending]);

  return (
    <Form
      title={'Регистрация'}
      onSubmit={form.onSubmit(values => controller.mutate(values))}
      link={{ href: appPaths.AUTHORIZATION, text: 'Уже есть аккаунт?' }}
    >
      <AnimatedChanger content={content}>
        <AnimatedChangerItem
          variant={getPositionByKey('REGISTRATION_FORM') ?? 'right'}
        >
          <RegistrationFormContent
            form={form}
            isPending={controller.isPending}
            errorText={
              apiError
                ? getErrorText(apiError?.type, REGISTRATION_POST_ERRORS)
                : undefined
            }
          />
        </AnimatedChangerItem>
        <AnimatedChangerItem
          variant={getPositionByKey('REGISTRATION_LOADING') ?? 'right'}
        >
          <Box h={200}>
            <CenterFlex>
              <Loader />
            </CenterFlex>
          </Box>
        </AnimatedChangerItem>
        <AnimatedChangerItem
          variant={getPositionByKey('REGISTRATION_SUCCESS') ?? 'right'}
        >
          <Box h={200}>
            <CenterFlex>
              <IconCircleCheckFilled />
            </CenterFlex>
          </Box>
        </AnimatedChangerItem>
      </AnimatedChanger>
    </Form>
  );
};
