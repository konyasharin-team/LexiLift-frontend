import { useInfiniteQuery } from '@api';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';
import { ModuleSchema } from '@modules/vocabularyModule/types/ModuleSchema.ts';
import { ModulesErrorSchema } from '@modules/vocabularyModule/types/ModulesErrorSchema.ts';
import { z } from 'zod';

export const useGetModulesAllController = () => {
  const getModulesAllController = useInfiniteQuery(
    {
      queryKey: ['GET_MODULES_ALL'],
      queryFn: ({ pageParam }) =>
        ModulesApi.GetModulesAll({ pageNumber: pageParam, pageSize: 5 }),
    },
    {
      resultSchema: z.array(ModuleSchema),
      errorSchema: ModulesErrorSchema,
    },
  );

  return {
    ...getModulesAllController,
  };
};
