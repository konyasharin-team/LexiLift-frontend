import { useNavigate } from 'react-router-dom';
import {
  getErrorTextWithEmpty,
  pendingToLoading,
  useMutation,
  useRequestEvents,
} from '@api';
import { useNotifications } from '@hooks';
import { useI18N } from '@i18n';
import { MODULES_ERRORS } from '@modules/vocabularyModule';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';
import { ModuleBackendSchema } from '@modules/vocabularyModule/types/ModuleSchema.ts';
import { ModulesErrorSchema } from '@modules/vocabularyModule/types/ModulesErrorSchema.ts';
import { generators } from '@routes';
import { notify } from '@utils';

export const useCreateModuleController = () => {
  const { t } = useI18N();
  const navigate = useNavigate();

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
  ]);

  useRequestEvents(pendingToLoading(createModuleController.sender), {
    onSuccess: result => {
      notify({
        type: 'success',
        message: t.createModulePage.createdSuccess,
      });
      if (result) navigate(generators.MODULES_GENERATORS.MODULE(result.id));
    },
  });

  return {
    ...createModuleController,
  };
};
