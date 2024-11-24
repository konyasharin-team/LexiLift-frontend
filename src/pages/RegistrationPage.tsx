import { FC } from 'react';
import {
  ConfirmationForm,
  RegistrationAnimatedChanger,
  registrationSteps,
  useRegistrationSteps,
} from '@modules/authorization';

export const RegistrationPage: FC = () => {
  const { step, onRegistrationSuccess, onConfirmSuccess } =
    useRegistrationSteps();

  return step === registrationSteps.REGISTRATION ? (
    <RegistrationAnimatedChanger onSuccess={onRegistrationSuccess} />
  ) : (
    <ConfirmationForm onSuccess={onConfirmSuccess} />
  );
};
