import { FC } from 'react';
import { getErrorTextWithEmpty } from '@api';
import { AlertGroup, useAlertGroup } from '@components/Alert';
import { Center } from '@components/Center';
import { useI18N } from '@i18n';
import {
  ConfirmationForm,
  REGISTRATION_POST_ERRORS,
  RegistrationAnimatedChanger,
  registrationSteps,
  useRegistrationController,
  useRegistrationSteps,
} from '@modules/authorization';

export const RegistrationPage: FC = () => {
  const { t } = useI18N();
  const { step, onRegistrationSuccess, onConfirmSuccess } =
    useRegistrationSteps();
  const registrationController = useRegistrationController();

  const { attributes: alertAttributes } = useAlertGroup(
    [
      {
        type: 'error',
        text: getErrorTextWithEmpty(registrationController.apiError?.type, {
          requestErrors: REGISTRATION_POST_ERRORS(t),
        }),
        on: !!registrationController.apiError,
      },
    ],
    {
      attributes: {
        delay: 0.65,
        durationOpen: 0.65,
      },
    },
  );

  return (
    <Center deltaY={100}>
      <AlertGroup {...alertAttributes}>
        {step === registrationSteps.REGISTRATION ? (
          <RegistrationAnimatedChanger
            onSuccess={onRegistrationSuccess}
            controller={registrationController}
          />
        ) : (
          <ConfirmationForm onSuccess={onConfirmSuccess} />
        )}
      </AlertGroup>
    </Center>
  );
};
