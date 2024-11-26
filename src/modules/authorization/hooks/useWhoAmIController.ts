import { useQuery } from '@api';
import { AuthApi } from '@modules/authorization/api/AuthApi.ts';
import { UserSchema } from '@modules/authorization/types/UserSchema.ts';

export const useWhoAmIController = () => {
  const controller = useQuery(
    {
      queryKey: ['WHO_AM_I'],
      queryFn: AuthApi.GetWhoAmI.bind(AuthApi),
    },
    {
      resultSchema: UserSchema,
    },
  );

  return {
    ...controller,
  };
};
