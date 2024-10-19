import { FC } from 'react';

import { ConfirmationForm } from '@modules/registration/components/ConfirmationForm/ConfirmationForm.tsx';
import { RegistrationForm } from '@modules/registration/components/RegistrationForm/RegistrationForm.tsx';
import { registrationSteps } from '@modules/registration/constants.ts';
import { useRegistrationSteps } from '@modules/registration/hooks/useRegistrationSteps.ts';

export const RegistrationPage: FC = () => {
  const { step, onRegistrationSuccess, onConfirmSuccess } =
    useRegistrationSteps();

  return step === registrationSteps.REGISTRATION ? (
    <RegistrationForm onSuccess={onRegistrationSuccess} />
  ) : (
    <ConfirmationForm onSuccess={onConfirmSuccess} />
  );
};
