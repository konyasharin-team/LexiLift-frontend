import { IId, useMutation } from '@api';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';
import { ModulesErrorSchema } from '@modules/vocabularyModule/types/ModulesErrorSchema.ts';
import { PutModuleBody } from '@modules/vocabularyModule/types/PutModuleBody.ts';

export const usePutModuleController = () => {
  const controller = useMutation(
    {
      mutationFn: (data: PutModuleBody & IId) =>
        ModulesApi.PutModule({ ...data }, { id: data.id }),
    },
    {
      errorSchema: ModulesErrorSchema,
    },
  );

  return {
    ...controller,
  };
};
