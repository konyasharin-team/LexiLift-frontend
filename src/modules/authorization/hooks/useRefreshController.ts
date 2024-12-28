import { useMutation } from '@api';
import { AuthApi } from '@modules/authorization/api/AuthApi.ts';
import { TokensErrorSchema } from '@modules/authorization/types/TokensErrorSchema.ts';
import { TokensSchema } from '@modules/authorization/types/TokensSchema.ts';

export const useRefreshController = () => {
  const controller = useMutation(
    {
      mutationFn: AuthApi.PostRefresh.bind(AuthApi),
    },
    {
      resultSchema: TokensSchema.pick({ accessToken: true }),
      errorSchema: TokensErrorSchema,
    },
  );

  return {
    ...controller,
  };
};
