import { useInfiniteQuery } from '@api';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';
import { ModulesErrorSchema } from '@modules/vocabularyModule/types/ModulesErrorSchema.ts';
import { ModulesPaginationSchema } from '@modules/vocabularyModule/types/ModulesPaginationSchema.ts';

export const useGetModulesUserController = () => {
  const getModulesUserController = useInfiniteQuery(
    {
      queryKey: ['GET_MODULES_USER'],
      queryFn: ({ pageParam }) =>
        ModulesApi.GetModulesUser({ pageNumber: pageParam, pageSize: 5 }),
    },
    {
      resultSchema: ModulesPaginationSchema,
      errorSchema: ModulesErrorSchema,
    },
  );

  return {
    ...getModulesUserController,
  };
};
