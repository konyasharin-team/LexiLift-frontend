import { ErrorSchema, useMutation } from '@api';
import { Authapi } from '@modules/authorization/api/Authapi.ts';
import { ChangePasswordErrorsSchema } from '@modules/authorization/types/ChangePasswordErrorsSchema.ts';
import { z } from 'zod';

export const useChangePasswordController = () => {
  const controller = useMutation(
    {
      mutationFn: Authapi.PutPassword.bind(Authapi),
    },
    {
      errorSchema: ErrorSchema(ChangePasswordErrorsSchema, z.object({})),
    },
  );

  return {
    ...controller,
  };
};
