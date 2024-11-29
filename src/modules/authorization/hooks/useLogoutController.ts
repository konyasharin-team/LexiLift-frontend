import { useMutation } from '@api';
import { Authapi } from '@modules/authorization/api/Authapi.ts';

export const useLogoutController = () => {
  const controller = useMutation({
    mutationFn: Authapi.DeleteLogout.bind(Authapi),
  });

  return {
    ...controller,
  };
};
