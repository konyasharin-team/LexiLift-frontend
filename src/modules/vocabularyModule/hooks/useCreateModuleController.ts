import { useMutation } from '@api';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';
import { ModuleSchema } from '@modules/vocabularyModule/types/ModuleSchema.ts';
import { ModulesErrorSchema } from '@modules/vocabularyModule/types/ModulesErrorSchema.ts';

export const useCreateModuleController = () => {
  const createModuleController = useMutation(
    {
      mutationFn: ModulesApi.PostModule.bind(ModulesApi),
    },
    {
      resultSchema: ModuleSchema,
      errorSchema: ModulesErrorSchema,
    },
  );

  return {
    ...createModuleController,
  };
};
