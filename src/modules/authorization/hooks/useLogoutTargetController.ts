import { useMutation } from '@api';
import { Authapi } from '@modules/authorization/api/Authapi.ts';

export const useLogoutTargetController = () => {
  const controller = useMutation({
    mutationFn: Authapi.DeleteLogoutTarget.bind(Authapi),
  });

  return {
    ...controller,
  };
};
