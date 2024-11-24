import { useQuery } from '@api';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';

import { GetModulesAboutData } from '@modules/vocabularyModule/types/GetModulesAboutData.ts';

export const useGetModulesAboutController = (data: GetModulesAboutData) => {
  const getModulesAboutController = useQuery({
    queryKey: ['GET_MODULES_ABOUT', data],
    queryFn: () => ModulesApi.GetModulesAbout(data),
  });

  return {
    ...getModulesAboutController,
  };
};
