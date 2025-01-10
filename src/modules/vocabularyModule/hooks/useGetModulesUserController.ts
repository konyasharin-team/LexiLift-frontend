import { useInfiniteQuery } from '@api';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';
import { ModulesErrorSchema } from '@modules/vocabularyModule/types/ModulesErrorSchema.ts';
import { ModulesPaginationBackendSchema } from '@modules/vocabularyModule/types/ModulesPaginationSchema.ts';
import { useAppSelector } from '@store';

export const useGetModulesUserController = () => {
  const { user } = useAppSelector(state => state.auth);

  const getModulesUserController = useInfiniteQuery(
    {
      queryKey: ['GET_MODULES_USER', user?.id],
      queryFn: ({ pageParam }) =>
        ModulesApi.GetModulesUser({ pageNumber: pageParam, pageSize: 5 }),
    },
    {
      resultSchema: ModulesPaginationBackendSchema,
      errorSchema: ModulesErrorSchema,
    },
  );

  return {
    ...getModulesUserController,
  };
};
