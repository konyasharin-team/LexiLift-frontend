import { FC, useEffect } from 'react';
import { getErrorText } from '@api';
import {
  AnimatedChanger,
  AnimatedChangerItem,
  findByKey,
} from '@components/AnimatedChanger';
import { FormWrapper } from '@components/Form';
import { Box, Loader, Paper } from '@mantine/core';
import {
  ConfirmationForm,
  REGISTRATION_POST_ERRORS,
  useRegistrationController,
} from '@modules/authorization';
import { RegistrationForm } from '@modules/authorization/components/RegistrationForm/RegistrationForm.tsx';
import { useRegistrationFormAnimatedChanger } from '@modules/authorization/hooks/useRegistrationFormAnimatedChanger.ts';
import { CenterFlex } from '@ui/CenterFlex';

interface IRegistrationFormProps {
  onSuccess?: () => void;
}

export const RegistrationAnimatedChanger: FC<IRegistrationFormProps> = () => {
  const { controller, apiError } = useRegistrationController();
  const animatedChanger = useRegistrationFormAnimatedChanger();

  useEffect(() => {
    if (
      animatedChanger.content.some(
        element =>
          element.key === 'REGISTRATION_SUCCESS' &&
          element.position === 'center',
      )
    )
      animatedChanger.onTransitionConfirmation();
  }, [animatedChanger.content]);

  useEffect(() => {
    if (controller.isSuccess) {
      animatedChanger.onSuccessRegistration();
      //props.onSuccess?.();
    }
  }, [controller.isSuccess]);

  useEffect(() => {
    if (controller.isPending) animatedChanger.onPendingRegistration();
    else if (controller.isError) animatedChanger.onErrorRegistration();
  }, [controller.isPending]);

  return (
    <FormWrapper>
      <AnimatedChanger content={animatedChanger.content}>
        <AnimatedChangerItem
          variant={
            findByKey(animatedChanger.content, 'REGISTRATION_FORM')?.position ??
            'right'
          }
        >
          <RegistrationForm
            controller={controller}
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
              <Paper c="green">Регистрация прошла успешно!</Paper>
            </CenterFlex>
          </Box>
        </AnimatedChangerItem>
        <AnimatedChangerItem
          variant={
            findByKey(animatedChanger.content, 'CONFIRMATION_FORM')?.position ??
            'right'
          }
        >
          <ConfirmationForm />
        </AnimatedChangerItem>
      </AnimatedChanger>
    </FormWrapper>
  );
};
