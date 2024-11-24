import { useMutation } from '@api';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';

export const useCreateModuleController = () => {
  const createModuleController = useMutation({
    mutationFn: ModulesApi.PostModule,
  });

  return {
    ...createModuleController,
  };
};
