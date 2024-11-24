import { AuthApi, useApiError } from '@api';
import { useMutation } from '@tanstack/react-query';

import { IAuthData } from '../types/IAuthData';

export const useAuthorizationRequests = () => {
  const loginController = useMutation({
    mutationFn: async (data: IAuthData) => await AuthApi.PostLogin(data),
  });

  const apiLoginError = useApiError(loginController.error);

  return {
    loginController,
    apiLoginError,
  };
};
