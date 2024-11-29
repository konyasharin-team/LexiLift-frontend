import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@api';
import { AuthApi } from '@modules/authorization/api/AuthApi.ts';
import { appPaths } from '@routes';
import { useActions } from '@store';

export const useLogoutController = () => {
  const { exit } = useActions();
  const navigate = useNavigate();
  const controller = useMutation({
    mutationFn: AuthApi.DeleteLogout.bind(AuthApi),
  });

  useEffect(() => {
    if (controller.sender.isSuccess) {
      exit();
      navigate(appPaths.AUTHORIZATION);
    }
  }, [controller.sender.isSuccess]);

  return {
    ...controller,
  };
};
