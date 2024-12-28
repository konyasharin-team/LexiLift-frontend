import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pendingToLoading, useQuery, useRequestEvents } from '@api';
import { useRefreshController } from '@modules/authorization';
import { AuthApi } from '@modules/authorization/api/AuthApi.ts';
import { TokensErrorSchema } from '@modules/authorization/types/TokensErrorSchema.ts';
import { UserSchema } from '@modules/authorization/types/UserSchema.ts';
import { TokensService } from '@modules/authorization/utils/TokensService.ts';
import { appPaths } from '@routes';
import { useActions, useAppSelector } from '@store';

export const useWhoAmIController = () => {
  const refreshController = useRefreshController();
  const { tokens, user } = useAppSelector(state => state.auth);
  const { setUser, setAppLoadingIsActive, exit, setTokens } = useActions();
  const navigate = useNavigate();

  const controller = useQuery(
    {
      queryKey: ['WHO_AM_I', tokens],
      queryFn: AuthApi.GetWhoAmI.bind(AuthApi),
      enabled: user !== null,
    },
    {
      resultSchema: UserSchema,
      errorSchema: TokensErrorSchema,
    },
  );

  useRequestEvents(controller.sender, {
    onSuccess: result => {
      if (result) setUser(result);
    },
    onError: () => {
      if (
        controller.apiError?.type === 'TOKEN_EXPIRED' ||
        (controller.apiError?.type === 'TOKEN_NOT_VALID' &&
          TokensService.IsNotEmpty(tokens))
      ) {
        refreshController.sender.mutate(tokens);
      } else {
        exit();
        navigate(appPaths.AUTHORIZATION);
      }
    },
  });

  useRequestEvents(pendingToLoading(refreshController.sender), {
    onSuccess: result => {
      if (result) setTokens({ ...tokens, ...result });
    },
    onError: () => {
      exit();
      navigate(appPaths.AUTHORIZATION);
    },
  });

  useEffect(() => {
    if (TokensService.IsNotEmpty(tokens)) controller.sender.refetch();
  }, [tokens]);

  useEffect(() => {
    setAppLoadingIsActive(controller.sender.isLoading);
  }, [controller.sender.isLoading]);

  return {
    ...controller,
  };
};
