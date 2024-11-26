import { AuthApi, ILogoutTargetData, useApiError } from '@api';
import { useMutation } from '@tanstack/react-query';

export const useAuthorizationDeleteTargetController = () => {
  const deleteLogoutTargetController = useMutation({
    mutationFn: async (data: ILogoutTargetData) =>
      AuthApi.DeleteLogoutTarget(data),
  });

  const apiDeleteLogoutTargetController = useApiError(
    deleteLogoutTargetController.error,
  );

  return {
    deleteLogoutTargetController,
    apiDeleteLogoutTargetController,
  };
};
