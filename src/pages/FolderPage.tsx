import { FC } from 'react';
import { getResult, IdSchema } from '@api';
import { idMiddleware, useParsedParams } from '@hooks';
import { Grid, GridCol } from '@mantine/core';
import {
  ControlledGetAbout,
  ControlledGetModules,
  FolderControls,
  FolderHead,
  useGetFolderAboutController,
  useGetFolderModulesController,
} from '@modules/folders';
import { ModulesList } from '@modules/vocabularyModule';

export const FolderPage: FC = () => {
  const parsedParams = useParsedParams(IdSchema, idMiddleware);
  const getModulesController = useGetFolderModulesController(parsedParams);
  const getAboutController = useGetFolderAboutController(parsedParams);

  const getModulesResult = getResult(getModulesController.sender);
  const getAboutResult = getResult(getAboutController.sender);

  return (
    <ControlledGetModules controller={getModulesController}>
      <ControlledGetAbout controller={getAboutController}>
        {getModulesResult && getAboutResult ? (
          <div>
            <FolderHead
              modulesCount={getModulesResult.length}
              {...getAboutResult}
            />
            <Grid mt={50} gutter={'md'}>
              <GridCol span={10}>
                <ModulesList modules={getModulesResult} />
              </GridCol>
              <GridCol span={2}>
                <FolderControls id={getAboutResult.id} />
              </GridCol>
            </Grid>
          </div>
        ) : undefined}
      </ControlledGetAbout>
    </ControlledGetModules>
  );
};
