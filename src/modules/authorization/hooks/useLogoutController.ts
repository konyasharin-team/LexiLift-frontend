import { AuthApi, useApiError } from '@api';
import { useMutation } from '@tanstack/react-query';

export const useLogoutController = () => {
  const deleteLogoutController = useMutation({
    mutationFn: async () => AuthApi.DeleteLogout(),
  });

  const apiDeleteLogoutController = useApiError(deleteLogoutController.error);

  return {
    deleteLogoutController,
    apiDeleteLogoutController,
  };
};
