import { AuthApi, PasswordError, useApiError } from '@api';
import { IPassword } from '@modules/authorization';
import { useMutation } from '@tanstack/react-query';

export const useAuthorizationPasswordController = () => {
  const passwordController = useMutation({
    mutationFn: async (data: IPassword) => await AuthApi.PutPassword(data),
  });

  const apiPasswordError = useApiError<PasswordError>(passwordController.error);

  return {
    passwordController,
    apiPasswordError,
  };
};
