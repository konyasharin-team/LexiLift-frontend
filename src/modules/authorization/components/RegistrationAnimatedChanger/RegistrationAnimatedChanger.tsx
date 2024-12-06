import { FC, useEffect } from 'react';
import { pendingToLoading, useRequestEvents } from '@api';
import {
  AnimatedChanger,
  AnimatedChangerItem,
  findByKey,
} from '@components/AnimatedChanger';
import { FormWrapper } from '@components/Form';
import { useI18N } from '@i18n';
import { Box, Loader, Paper } from '@mantine/core';
import {
  ConfirmationForm,
  useRegistrationController,
} from '@modules/authorization';
import { RegistrationForm } from '@modules/authorization/components/RegistrationForm/RegistrationForm.tsx';
import { useRegistrationFormAnimatedChanger } from '@modules/authorization/hooks/useRegistrationFormAnimatedChanger.ts';
import { CenterFlex } from '@ui/CenterFlex';

interface IRegistrationFormProps {
  controller: ReturnType<typeof useRegistrationController>;
  onSuccess?: () => void;
}

export const RegistrationAnimatedChanger: FC<
  IRegistrationFormProps
> = props => {
  const { t } = useI18N();
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

  useRequestEvents(pendingToLoading(props.controller.sender), {
    onSuccess: animatedChanger.onSuccessRegistration,
    onLoading: animatedChanger.onPendingRegistration,
    onError: animatedChanger.onErrorRegistration,
  });

  return (
    <FormWrapper>
      <AnimatedChanger content={animatedChanger.content}>
        <AnimatedChangerItem
          variant={
            findByKey(animatedChanger.content, 'REGISTRATION_FORM')?.position ??
            'right'
          }
        >
          <RegistrationForm controller={props.controller} />
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
              <Paper c="green">
                {t.registrationPage.successfulRegistration}
              </Paper>
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
