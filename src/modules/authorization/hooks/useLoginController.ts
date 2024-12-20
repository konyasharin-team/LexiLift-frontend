import { useNavigate } from 'react-router-dom';
import { pendingToLoading, useMutation, useRequestEvents } from '@api';
import { AuthApi } from '@modules/authorization/api/AuthApi.ts';
import { TokensSchema } from '@modules/authorization/types/TokensSchema.ts';
import { appPaths } from '@routes';

export const useLoginController = () => {
  const navigate = useNavigate();
  const controller = useMutation(
    {
      mutationFn: AuthApi.PostLogin.bind(AuthApi),
    },
    {
      resultSchema: TokensSchema,
    },
  );

  useRequestEvents(pendingToLoading(controller.sender), {
    onSuccess: () => navigate(appPaths.MODULES),
  });

  return {
    ...controller,
  };
};
