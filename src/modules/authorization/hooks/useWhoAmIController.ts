import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useRequestEvents } from '@api';
import { Authapi } from '@modules/authorization/api/Authapi.ts';
import { UserSchema } from '@modules/authorization/types/UserSchema.ts';
import { TokensService } from '@modules/authorization/utils/TokensService.ts';
import { appPaths } from '@routes';
import { useActions, useAppSelector } from '@store';

export const useWhoAmIController = () => {
  const { tokens, user } = useAppSelector(state => state.auth);
  const { setUser } = useActions();
  const navigate = useNavigate();

  const controller = useQuery(
    {
      queryKey: ['WHO_AM_I', tokens],
      queryFn: Authapi.GetWhoAmI.bind(Authapi),
      enabled: user !== null,
    },
    {
      resultSchema: UserSchema,
    },
  );

  useRequestEvents(controller.sender, {
    onSuccess: setUser,
  });

  useEffect(() => {
    if (TokensService.IsNotEmpty(tokens)) controller.sender.refetch();
  }, [tokens]);

  useEffect(() => {
    if (user) navigate(appPaths.MODULES);
  }, [user]);

  return {
    ...controller,
  };
};
