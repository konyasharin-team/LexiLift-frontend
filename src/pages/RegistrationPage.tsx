import { FC, useEffect, useState } from 'react';
import { getErrorText } from '@api';
import { AlertGroup } from '@components/Alert';
import { CenterPage } from '@components/CenterPage';
import {
  ConfirmationForm,
  REGISTRATION_POST_ERRORS,
  RegistrationAnimatedChanger,
  registrationSteps,
  useRegistrationController,
  useRegistrationSteps,
} from '@modules/authorization';

export const RegistrationPage: FC = () => {
  const [openedAlert, setOpenedAlert] = useState(false);
  const { step, onRegistrationSuccess, onConfirmSuccess } =
    useRegistrationSteps();
  const registrationController = useRegistrationController();

  useEffect(() => {
    setOpenedAlert(!!registrationController.apiError);
  }, [registrationController.apiError]);

  return (
    <CenterPage deltaY={100}>
      <AlertGroup
        delay={0.65}
        durationOpen={0.65}
        durationClose={0.1}
        type={'error'}
        text={
          registrationController.apiError
            ? getErrorText(registrationController.apiError.type, {
                requestErrors: REGISTRATION_POST_ERRORS,
              })
            : undefined
        }
        setOpened={setOpenedAlert}
        opened={openedAlert}
      >
        {step === registrationSteps.REGISTRATION ? (
          <RegistrationAnimatedChanger
            onSuccess={onRegistrationSuccess}
            controller={registrationController}
          />
        ) : (
          <ConfirmationForm onSuccess={onConfirmSuccess} />
        )}
      </AlertGroup>
    </CenterPage>
  );
};
