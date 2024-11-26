import { AuthApi, useApiError } from '@api';
import { ITokens } from '@app-types';
import { useMutation } from '@tanstack/react-query';

export const useAuthorizationRefreshController = () => {
  const refreshController = useMutation({
    mutationFn: async (data: Pick<ITokens, 'refreshToken'>) =>
      await AuthApi.PostRefresh(data),
  });

  const apiRefreshController = useApiError(refreshController.error);

  return {
    refreshController,
    apiRefreshController,
  };
};
