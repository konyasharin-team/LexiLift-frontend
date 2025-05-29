import { useMutation } from '@api';
import { AuthApi } from '@modules/authorization/api/AuthApi.ts';

export const useDeleteAccountTarget = () => {
  const controller = useMutation({
    mutationFn: AuthApi.DeleteAccountTarget.bind(AuthApi),
  });

  return {
    ...controller,
  };
};
