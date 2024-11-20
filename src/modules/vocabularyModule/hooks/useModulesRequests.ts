import { useState } from 'react';
import { useMutation, useQuery, useQueryRequestsBound } from '@api';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';
import { CreateModuleData } from '@modules/vocabularyModule/types/CreateModuleData.ts';
import { UseModulesRequestsBound } from '@modules/vocabularyModule/types/UseModulesRequestsBound.ts';

export const useModulesRequests = (
  boundedRequests: UseModulesRequestsBound[] = [],
) => {
  const [page, setPage] = useState(0);
  const { getRequestOptions } =
    useQueryRequestsBound<UseModulesRequestsBound>(boundedRequests);
  const getModulesUserController = useQuery({
    queryKey: ['getModulesUser', page],
    queryFn: () => ModulesApi.GetModulesUser({ pageNumber: page, pageSize: 5 }),
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
    page,
    setPage,
  };
};
