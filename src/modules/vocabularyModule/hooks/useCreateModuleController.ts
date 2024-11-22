import { useMutation } from '@api';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';
import { CreateModuleData } from '@modules/vocabularyModule/types/CreateModuleData.ts';

export const useCreateModuleController = () => {
  const createModuleController = useMutation({
    mutationFn: (data: CreateModuleData) => ModulesApi.PostModules(data),
  });

  return {
    ...createModuleController,
  };
};
