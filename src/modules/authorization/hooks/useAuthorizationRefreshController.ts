import { AuthApi, useApiError } from '@api';
import { IRefreshToken } from '@modules/authorization/types/IRefreshToken.ts';
import { useMutation } from '@tanstack/react-query';

export const useAuthorizationRefreshController = () => {
  const refreshController = useMutation({
    mutationFn: async (data: IRefreshToken) => await AuthApi.PostRefresh(data),
  });

  const apiRefreshController = useApiError(refreshController.error);

  return {
    refreshController,
    apiRefreshController,
  };
};
