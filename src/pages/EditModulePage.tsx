import { FC } from 'react';
import { getErrorTextWithEmpty, IdSchema, useRequestEvents } from '@api';
import { ControlledComponent } from '@components/ControlledComponent';
import { idMiddleware, useParsedParams } from '@hooks';
import { useI18N } from '@i18n';
import {
  EditModuleCards,
  EditModuleInfo,
  EditModuleWrapper,
  moduleFromBackendFieldsTransform,
  MODULES_ERRORS,
  moduleToBackendFieldsTransform,
  useEditModule,
  useGetModuleAboutController,
  usePutModuleController,
} from '@modules/vocabularyModule';

export const EditModulePage: FC = () => {
  const { t } = useI18N();
  const params = useParsedParams(IdSchema, idMiddleware);
  const editModuleController = useEditModule();
  const getModuleApiController = useGetModuleAboutController(params);
  const editModuleApiController = usePutModuleController(params);

  useRequestEvents(getModuleApiController.sender, {
    onSuccess: result => {
      if (result) {
        editModuleController.form.setValues({
          ...result,
          ...moduleFromBackendFieldsTransform(result),
        });
      }
    },
  });

  return (
    <ControlledComponent
      {...getModuleApiController.sender}
      error={getErrorTextWithEmpty(getModuleApiController.apiError?.type, {
        requestErrors: MODULES_ERRORS(t),
      })}
      dependencies={[editModuleController.form.values]}
    >
      {() => (
        <EditModuleWrapper
          {...editModuleController}
          loading={editModuleApiController.sender.isPending}
          sendText={t.createModulePage.editModule}
          onSubmit={values => {
            editModuleApiController.sender.mutate({
              ...values,
              ...moduleToBackendFieldsTransform(values),
            });
          }}
        >
          <EditModuleInfo {...editModuleController} />
          <EditModuleCards {...editModuleController} />
        </EditModuleWrapper>
      )}
    </ControlledComponent>
  );
};
