import { useMutation } from '@api';
import { AuthApi } from '@modules/authorization/api/AuthApi.ts';
import { TokensSchema } from '@modules/authorization/types/TokensSchema.ts';

export const useLoginController = () => {
  const controller = useMutation(
    {
      mutationFn: AuthApi.PostLogin.bind(AuthApi),
    },
    {
      resultSchema: TokensSchema,
    },
  );

  return {
    ...controller,
  };
};
