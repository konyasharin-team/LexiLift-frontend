import { useMutation } from '@api';
import { AuthApi } from '@modules/authorization/api/AuthApi.ts';

export const useLogoutTargetController = () => {
  const controller = useMutation({
    mutationFn: AuthApi.DeleteLogoutTarget.bind(AuthApi),
  });

  return {
    ...controller,
  };
};
