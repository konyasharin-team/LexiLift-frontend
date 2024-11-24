import { useQuery } from '@api';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';
import { IModuleApi } from '@modules/vocabularyModule/types/IModuleApi.ts';

export const useGetModuleAboutController = (data: Pick<IModuleApi, 'id'>) => {
  const getModulesAboutController = useQuery({
    queryKey: ['GET_MODULES_ABOUT', data],
    queryFn: () => ModulesApi.GetModuleAbout(data),
  });

  return {
    ...getModulesAboutController,
  };
};
