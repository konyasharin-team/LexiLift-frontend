import { FC } from 'react';
import { getErrorTextWithEmpty, IdSchema } from '@api';
import { ControlledPage } from '@components/ControlledPage';
import { idMiddleware, useParsedParams } from '@hooks';
import { Grid, GridCol } from '@mantine/core';
import { wordPairs } from '@modules/matchTest/data.ts';
import {
  GET_MODULE_ABOUT_ERRORS,
  ModuleFlipCards,
  ModuleHead,
  ModuleTestsButtons,
  useGetModuleAboutController,
} from '@modules/vocabularyModule';

export const ModulePage: FC = () => {
  const parsedParams = useParsedParams(IdSchema, idMiddleware);
  const controller = useGetModuleAboutController(parsedParams);

  return (
    <ControlledPage
      {...controller.sender}
      error={getErrorTextWithEmpty(controller.apiError?.type, {
        requestErrors: GET_MODULE_ABOUT_ERRORS,
      })}
    >
      {result =>
        result ? (
          <div style={{ overflow: 'hidden' }}>
            <ModuleHead {...result} />
            <Grid mt={50}>
              <GridCol span={2}>
                <ModuleTestsButtons />
              </GridCol>
              <GridCol span={10}>
                <ModuleFlipCards cards={wordPairs} />
              </GridCol>
            </Grid>
          </div>
        ) : undefined
      }
    </ControlledPage>
  );
};
