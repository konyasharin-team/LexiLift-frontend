import { getErrorTextWithEmpty, useMutation } from '@api';
import { useNotifications } from '@hooks';
import { useI18N } from '@i18n';
import { MODULES_ERRORS } from '@modules/vocabularyModule';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';
import { ModuleBackendSchema } from '@modules/vocabularyModule/types/ModuleSchema.ts';
import { ModulesErrorSchema } from '@modules/vocabularyModule/types/ModulesErrorSchema.ts';

export const useCreateModuleController = () => {
  const { t } = useI18N();

  const createModuleController = useMutation(
    {
      mutationFn: ModulesApi.PostModule.bind(ModulesApi),
    },
    {
      resultSchema: ModuleBackendSchema,
      errorSchema: ModulesErrorSchema,
    },
  );

  useNotifications([
    {
      type: 'error',
      message: getErrorTextWithEmpty(createModuleController.apiError?.type, {
        requestErrors: MODULES_ERRORS(t),
      }),
      on: !!createModuleController.apiError,
    },
    {
      type: 'success',
      message: t.createModulePage.createdSuccess,
      on: createModuleController.sender.isSuccess,
    },
  ]);

  return {
    ...createModuleController,
  };
};
