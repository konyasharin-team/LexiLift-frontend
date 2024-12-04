import { IdSchemaInfer, useQuery } from '@api';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';
import { ModuleSchema } from '@modules/vocabularyModule/types/ModuleSchema.ts';
import { ModulesErrorSchema } from '@modules/vocabularyModule/types/ModulesErrorSchema.ts';

export const useGetModuleAboutController = (data?: IdSchemaInfer) => {
  const getModulesAboutController = useQuery(
    {
      queryKey: ['GET_MODULES_ABOUT', data],
      queryFn: data ? () => ModulesApi.GetModuleAbout(data) : undefined,
    },
    {
      resultSchema: ModuleSchema,
      errorSchema: ModulesErrorSchema,
    },
  );

  return {
    ...getModulesAboutController,
  };
};
