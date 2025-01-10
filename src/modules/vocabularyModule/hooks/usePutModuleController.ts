import { useNavigate } from 'react-router-dom';
import {
  getErrorTextWithEmpty,
  IdSchemaInfer,
  pendingToLoading,
  useMutation,
  useRequestEvents,
} from '@api';
import { useNotifications } from '@hooks';
import { useI18N } from '@i18n';
import { MODULES_ERRORS } from '@modules/vocabularyModule';
import { ModulesApi } from '@modules/vocabularyModule/api/ModulesApi.ts';
import { ModulesErrorSchema } from '@modules/vocabularyModule/types/ModulesErrorSchema.ts';
import { PutModuleBody } from '@modules/vocabularyModule/types/PutModuleBody.ts';
import { generators } from '@routes';
import { notify } from '@utils';

export const usePutModuleController = (idObj?: IdSchemaInfer) => {
  const { t } = useI18N();
  const navigate = useNavigate();
  const controller = useMutation(
    {
      mutationFn: idObj
        ? (data: PutModuleBody) => ModulesApi.PutModule({ ...data }, idObj)
        : undefined,
    },
    {
      errorSchema: ModulesErrorSchema,
    },
  );

  useNotifications([
    {
      type: 'error',
      on: controller.sender.isError,
      message: getErrorTextWithEmpty(controller.apiError?.type, {
        requestErrors: MODULES_ERRORS(t),
      }),
    },
  ]);

  useRequestEvents(pendingToLoading(controller.sender), {
    onSuccess: () => {
      notify({
        type: 'success',
        message: t.createModulePage.updatedSuccess,
      });
      if (idObj) navigate(generators.MODULES_GENERATORS.MODULE(idObj.id));
    },
  });

  return {
    ...controller,
  };
};
