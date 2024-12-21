import { useInfiniteQuery } from '@api';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';
import { ModulesErrorSchema } from '@modules/vocabularyModule/types/ModulesErrorSchema.ts';
import { ModulesPaginationBackendSchema } from '@modules/vocabularyModule/types/ModulesPaginationSchema.ts';

export const useGetModulesAllController = () => {
  const getModulesAllController = useInfiniteQuery(
    {
      queryKey: ['GET_MODULES_ALL'],
      queryFn: ({ pageParam }) =>
        ModulesApi.GetModulesAll({ pageNumber: pageParam, pageSize: 5 }),
    },
    {
      resultSchema: ModulesPaginationBackendSchema,
      errorSchema: ModulesErrorSchema,
    },
  );

  return {
    ...getModulesAllController,
  };
};
