import { useMutation } from '@api';
import { AuthApi } from '@modules/authorization/api/AuthApi.ts';

export const useLogoutController = () => {
  const controller = useMutation({
    mutationFn: AuthApi.DeleteLogout.bind(AuthApi),
  });

  return {
    ...controller,
  };
};
