import { ErrorSchema, useMutation } from '@api';
import { AuthApi } from '@modules/authorization/api/AuthApi.ts';
import { RegistrationErrorsSchema } from '@modules/authorization/types/RegistrationErrorsSchema.ts';
import { z } from 'zod';

export const useRegistrationController = () => {
  const controller = useMutation(
    {
      mutationFn: AuthApi.PostRegistration.bind(AuthApi),
    },
    {
      errorSchema: ErrorSchema(RegistrationErrorsSchema, z.object({})),
    },
  );

  return {
    ...controller,
  };
};
