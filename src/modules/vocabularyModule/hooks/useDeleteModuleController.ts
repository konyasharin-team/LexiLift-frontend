import { useMutation } from '@api';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';

export const useDeleteModuleController = () => {
  const deleteModuleController = useMutation({
    mutationFn: ModulesApi.DeleteModule,
  });

  return {
    ...deleteModuleController,
  };
};
