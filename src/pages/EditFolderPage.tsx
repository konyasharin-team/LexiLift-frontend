import { FC, useEffect, useState } from 'react';
import { getResult, IdSchema } from '@api';
import { idMiddleware, useParsedParams } from '@hooks';
import { useI18N } from '@i18n';
import { Flex } from '@mantine/core';
import {
  ControlledGetAbout,
  ControlledGetModules,
  EditFolderInfo,
  EditFolderWrapper,
  ModulesWithFolderControls,
  useAddModulesToFolderController,
  useEditFolderForm,
  useGetFolderAboutController,
  useGetFolderModulesController,
  usePutFolderController,
  useRemoveModulesFromFolderController,
} from '@modules/folders';

export const EditFolderPage: FC = () => {
  const { form, addModule, removeModule } = useEditFolderForm();
  const { t } = useI18N();
  const [isFirstSetForm, setIsFirstSetForm] = useState(true);

  const params = useParsedParams(IdSchema, idMiddleware);
  const updateInfoController = usePutFolderController();
  const getAboutController = useGetFolderAboutController(params);
  const addModulesController = useAddModulesToFolderController();
  const removeModulesController = useRemoveModulesFromFolderController();
  const getModulesController = useGetFolderModulesController(params);

  const getModulesResult = getResult(getModulesController.sender);
  const getAboutResult = getResult(getAboutController.sender);

  useEffect(() => {
    if (getAboutResult && getModulesResult && isFirstSetForm) {
      setIsFirstSetForm(false);
      form.setValues({
        ...getAboutResult,
        modules: getModulesResult.map(module => module.id),
      });
    }
  }, [getModulesResult, getAboutResult]);

  return (
    <ControlledGetAbout controller={getAboutController}>
      <ControlledGetModules controller={getModulesController}>
        {getModulesResult && getAboutResult ? (
          <EditFolderWrapper
            form={form}
            sendText={t.createFolderPage.editFolder}
            onSubmit={values => {
              if (params) {
                updateInfoController.sender.mutate({
                  id: params.id,
                  ...values,
                });

                const modulesToAdd = values.modules.filter(
                  id => !getModulesResult.some(module => module.id === id),
                );
                const modulesToRemove = getModulesResult
                  .filter(
                    module => !form.values.modules.some(id => module.id !== id),
                  )
                  .map(module => module.id);
                console.log(
                  getModulesResult.map(module => module.id),
                  form.values.modules,
                );

                if (modulesToAdd.length)
                  addModulesController.sender.mutate({
                    id: params.id,
                    moduleIds: modulesToAdd,
                  });

                if (modulesToRemove.length)
                  removeModulesController.sender.mutate({
                    id: params.id,
                    moduleIds: modulesToRemove,
                  });
              }
            }}
            loading={
              updateInfoController.sender.isPending ||
              addModulesController.sender.isPending ||
              removeModulesController.sender.isPending
            }
          >
            <Flex direction={'column'} gap={20}>
              <EditFolderInfo form={form} />
              <ModulesWithFolderControls
                onAdd={addModule}
                onRemove={removeModule}
                activeModules={form.values.modules}
              />
            </Flex>
          </EditFolderWrapper>
        ) : undefined}
      </ControlledGetModules>
    </ControlledGetAbout>
  );
};
