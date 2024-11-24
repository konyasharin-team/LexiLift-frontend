import { useInfiniteQuery } from '@api';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';

export const useGetModulesAllController = () => {
  const getModulesAllController = useInfiniteQuery({
    queryKey: ['GET_MODULES_ALL'],
    queryFn: ({ pageParam }) =>
      ModulesApi.GetModulesAll({ pageNumber: pageParam, pageSize: 5 }),
  });

  return {
    ...getModulesAllController,
  };
};
