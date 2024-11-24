import { AuthApi, useApiError } from '@api';
import { useQuery } from '@tanstack/react-query';

export const useAuthorizationWhoAmIController = () => {
  const whoAmIController = useQuery({
    queryKey: ['WHO_AM_I'],
    queryFn: () => AuthApi.GetWhoAmI(),
  });

  const apiUserError = useApiError(whoAmIController.error);

  return {
    whoAmIController,
    apiUserError,
  };
};
