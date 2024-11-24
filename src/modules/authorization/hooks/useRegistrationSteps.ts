import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appPaths } from '@routes';

import { registrationSteps } from '../constants.ts';

export const useRegistrationSteps = () => {
  const [step, setStep] = useState<keyof typeof registrationSteps>(
    registrationSteps.REGISTRATION,
  );

  const navigate = useNavigate();

  const onRegistrationSuccess = () => setStep(registrationSteps.CONFIRM);

  const onConfirmSuccess = () => navigate(appPaths.AUTHORIZATION);

  return {
    step,
    onConfirmSuccess,
    onRegistrationSuccess,
  };
};
