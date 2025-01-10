import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { pendingToLoading, useRequestEvents } from '@api';
import { useI18N } from '@i18n';
import {
  EditModuleCards,
  EditModuleInfo,
  EditModuleWrapper,
  moduleToBackendFieldsTransform,
  useCreateModuleController,
  useEditModule,
} from '@modules/vocabularyModule';
import { generators } from '@routes';

export const CreateModulePage: FC = () => {
  const { t } = useI18N();
  const editModuleController = useEditModule();
  const createModuleApiController = useCreateModuleController();
  const navigate = useNavigate();

  useRequestEvents(pendingToLoading(createModuleApiController.sender), {
    onSuccess: result => {
      if (result) navigate(generators.MODULES_GENERATORS.MODULE(result.id));
    },
  });

  return (
    <EditModuleWrapper
      {...editModuleController}
      loading={createModuleApiController.sender.isPending}
      sendText={t.createModulePage.createModule}
      onSubmit={values => {
        createModuleApiController.sender.mutate({
          ...values,
          ...moduleToBackendFieldsTransform(values),
        });
      }}
    >
      <EditModuleInfo {...editModuleController} />
      <EditModuleCards {...editModuleController} />
    </EditModuleWrapper>
  );
};
