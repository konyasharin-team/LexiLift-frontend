import { ErrorSchema, useMutation } from '@api';
import { Authapi } from '@modules/authorization/api/Authapi.ts';
import { RegistrationErrorsSchema } from '@modules/authorization/types/RegistrationErrorsSchema.ts';
import { z } from 'zod';

export const useRegistrationController = () => {
  const controller = useMutation(
    {
      mutationFn: Authapi.PostRegistration.bind(Authapi),
    },
    {
      errorSchema: ErrorSchema(RegistrationErrorsSchema, z.object({})),
    },
  );

  return {
    ...controller,
  };
};
