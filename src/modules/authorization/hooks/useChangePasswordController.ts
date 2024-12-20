import { ErrorSchema, useMutation } from '@api';
import { AuthApi } from '@modules/authorization/api/AuthApi.ts';
import { ChangePasswordErrorsSchema } from '@modules/authorization/types/ChangePasswordErrorsSchema.ts';
import { z } from 'zod';

export const useChangePasswordController = () => {
  const controller = useMutation(
    {
      mutationFn: AuthApi.PutPassword.bind(AuthApi),
    },
    {
      errorSchema: ErrorSchema(ChangePasswordErrorsSchema, z.object({})),
    },
  );

  return {
    ...controller,
  };
};
