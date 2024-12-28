import { FC, useEffect } from 'react';
import { useI18N } from '@i18n';
import { Affix, Button } from '@mantine/core';
import {
  EditModuleCards,
  EditModuleInfo,
  useCreateModuleController,
  useEditModule,
} from '@modules/vocabularyModule';
import { moduleToBackendFieldsTransform } from '@modules/vocabularyModule/utils/moduleToBackendFieldsTransform.ts';

export const EditModulePage: FC = () => {
  const { t } = useI18N();
  const editModuleController = useEditModule();
  const createModuleApiController = useCreateModuleController();

  useEffect(() => {
    if (createModuleApiController.sender.isSuccess)
      editModuleController.form.reset();
  }, [createModuleApiController.sender.isSuccess]);

  return (
    <>
      <EditModuleInfo {...editModuleController} />
      <EditModuleCards {...editModuleController} />
      <Affix position={{ bottom: 20, right: 20 }}>
        <Button
          radius="md"
          size="xl"
          color="blue"
          loading={createModuleApiController.sender.isPending}
          disabled={
            editModuleController.form.values.words.some(
              card => card.word.length === 0 || card.translation.length === 0,
            ) ||
            !editModuleController.form.values.title ||
            !editModuleController.form.values.description
          }
          onClick={() => {
            createModuleApiController.sender.mutate({
              ...editModuleController.form.values,
              ...moduleToBackendFieldsTransform(
                editModuleController.form.values,
              ),
            });
          }}
        >
          {t.createModulePage.createModule}
        </Button>
      </Affix>
    </>
  );
};
