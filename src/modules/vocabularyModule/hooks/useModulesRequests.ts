import { useInfiniteQuery, useMutation, useQueryRequestsBound } from '@api';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';
import { CreateModuleData } from '@modules/vocabularyModule/types/CreateModuleData.ts';
import { UseModulesRequestsBound } from '@modules/vocabularyModule/types/UseModulesRequestsBound.ts';

export const useModulesRequests = (
  boundedRequests: UseModulesRequestsBound[] = [],
) => {
  const { getRequestOptions } =
    useQueryRequestsBound<UseModulesRequestsBound>(boundedRequests);
  const getModulesUserController = useInfiniteQuery({
    queryKey: ['GET_MODULES_USER'],
    queryFn: ({ pageParam }) =>
      ModulesApi.GetModulesUser({ pageNumber: pageParam, pageSize: 5 }),
    ...getRequestOptions('GET_MODULES_USER'),
  });
  const createModuleController = useMutation({
    mutationFn: (data: CreateModuleData) => ModulesApi.PostModules(data),
  });

  return {
    controllers: {
      getModulesUserController,
      createModuleController,
    },
  };
};
