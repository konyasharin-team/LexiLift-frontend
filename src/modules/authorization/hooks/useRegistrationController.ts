import { ErrorSchema, useMutation } from '@api';
import { AuthApi } from '@modules/authorization/api/AuthApi.ts';
import { RegistrationErrorsSchema } from '@modules/authorization/types/RegistrationErrorsSchema.ts';
import { RegistrationReturnSchema } from '@modules/authorization/types/RegistrationReturnSchema.ts';
import { z } from 'zod';

export const useRegistrationController = () => {
  const controller = useMutation(
    {
      mutationFn: AuthApi.PostRegistration.bind(AuthApi),
    },
    {
      resultSchema: RegistrationReturnSchema,
      errorSchema: ErrorSchema(RegistrationErrorsSchema, z.object({})),
    },
  );

  return {
    ...controller,
  };
};
