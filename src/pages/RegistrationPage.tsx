import { FC } from 'react';
import {
  ConfirmationForm,
  RegistrationForm,
  registrationSteps,
  useRegistrationSteps,
} from '@modules/registration';

export const RegistrationPage: FC = () => {
  const { step, onRegistrationSuccess, onConfirmSuccess } =
    useRegistrationSteps();

  return step === registrationSteps.REGISTRATION ? (
    <RegistrationForm onSuccess={onRegistrationSuccess} />
  ) : (
    <ConfirmationForm onSuccess={onConfirmSuccess} />
  );
};
