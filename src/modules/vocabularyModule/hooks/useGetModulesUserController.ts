import { useInfiniteQuery } from '@api';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';

export const useGetModulesUserController = () => {
  const getModulesUserController = useInfiniteQuery({
    queryKey: ['GET_MODULES_USER'],
    queryFn: ({ pageParam }) =>
      ModulesApi.GetModulesUser({ pageNumber: pageParam, pageSize: 5 }),
  });

  return {
    ...getModulesUserController,
  };
};
