import { useMutation } from '@api';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';
import { ModulesErrorSchema } from '@modules/vocabularyModule/types/ModulesErrorSchema.ts';

export const useDeleteModuleController = () => {
  const deleteModuleController = useMutation(
    {
      mutationFn: ModulesApi.DeleteModule.bind(ModulesApi),
    },
    {
      errorSchema: ModulesErrorSchema,
    },
  );

  return {
    ...deleteModuleController,
  };
};
