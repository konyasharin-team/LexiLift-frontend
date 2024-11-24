import { AuthApi, RegistrationError, useApiError } from '@api';
import { IAuthData } from '../types/IAuthData';
import { useMutation } from '@tanstack/react-query';

export const useRegistrationRequests = () => {
  const controller = useMutation({
    mutationFn: async (data: IAuthData) => await AuthApi.PostRegistration(data),
  });

  const apiError = useApiError<RegistrationError>(controller.error);

  return {
    controller,
    apiError,
  };
};
