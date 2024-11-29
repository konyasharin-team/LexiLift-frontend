import { useMutation } from '@api';
import { Authapi } from '@modules/authorization/api/Authapi.ts';
import { TokensSchema } from '@modules/authorization/types/TokensSchema.ts';

export const useLoginController = () => {
  const controller = useMutation(
    {
      mutationFn: Authapi.PostLogin.bind(Authapi),
    },
    {
      resultSchema: TokensSchema,
    },
  );

  return {
    ...controller,
  };
};
