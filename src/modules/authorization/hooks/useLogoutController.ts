import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorTextWithEmpty, useMutation } from '@api';
import { useNotifications } from '@hooks';
import { AuthApi } from '@modules/authorization/api/AuthApi.ts';
import { appPaths } from '@routes';
import { useActions } from '@store';

export const useLogoutController = () => {
  const { exit } = useActions();
  const navigate = useNavigate();
  const controller = useMutation({
    mutationFn: AuthApi.DeleteLogout.bind(AuthApi),
  });

  useNotifications([
    {
      type: 'error',
      message: getErrorTextWithEmpty(controller.apiError?.type),
      on: !!controller.apiError,
    },
  ]);

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
