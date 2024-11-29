import { useMutation } from '@api';
import { Authapi } from '@modules/authorization/api/Authapi.ts';
import { TokensSchema } from '@modules/authorization/types/TokensSchema.ts';

export const useRefreshController = () => {
  const controller = useMutation(
    {
      mutationFn: Authapi.PostRefresh.bind(Authapi),
    },
    {
      resultSchema: TokensSchema.pick({ accessToken: true }),
    },
  );

  return {
    ...controller,
  };
};
