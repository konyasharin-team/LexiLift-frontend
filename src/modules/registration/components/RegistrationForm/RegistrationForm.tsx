import { FC, useEffect } from 'react';
import { getErrorText } from '@api';
import {
  AnimatedChanger,
  AnimatedChangerItem,
  findByKey,
} from '@components/AnimatedChanger';
import { Form } from '@components/Form/Form.tsx';
import { Box, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  REGISTRATION_POST_ERRORS,
  useRegistrationRequests,
} from '@modules/registration';
import { RegistrationFormContent } from '@modules/registration/components/RegistrationFormContent/RegistrationFormContent.tsx';
import { useRegistrationFormAnimatedChanger } from '@modules/registration/hooks/useRegistrationFormAnimatedChanger.ts';
import { appPaths } from '@routes';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { CenterFlex } from '@ui/CenterFlex';

import { validateRegistration } from '../../utils/validateRegistration';

interface IRegistrationFormProps {
  onSuccess?: () => void;
}

export const RegistrationForm: FC<IRegistrationFormProps> = props => {
  const { controller, apiError } = useRegistrationRequests();
  const animatedChanger = useRegistrationFormAnimatedChanger();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: validateRegistration,
  });

  useEffect(() => {
    if (controller.isSuccess) {
      animatedChanger.onSuccessRegistration();
      // props.onSuccess?.();
    }
  }, [controller.isSuccess]);

  useEffect(() => {
    if (controller.isPending) animatedChanger.onPendingRegistration();
    else if (controller.isError) animatedChanger.onErrorRegistration();
  }, [controller.isPending]);

  return (
    <Form
      title={'Регистрация'}
      onSubmit={form.onSubmit(values => controller.mutate(values))}
      link={{ href: appPaths.AUTHORIZATION, text: 'Уже есть аккаунт?' }}
    >
      <AnimatedChanger content={animatedChanger.content}>
        <AnimatedChangerItem
          variant={
            findByKey(animatedChanger.content, 'REGISTRATION_FORM')?.position ??
            'right'
          }
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
          variant={
            findByKey(animatedChanger.content, 'REGISTRATION_LOADING')
              ?.position ?? 'right'
          }
        >
          <Box h={200}>
            <CenterFlex>
              <Loader />
            </CenterFlex>
          </Box>
        </AnimatedChangerItem>
        <AnimatedChangerItem
          variant={
            findByKey(animatedChanger.content, 'REGISTRATION_SUCCESS')
              ?.position ?? 'right'
          }
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
