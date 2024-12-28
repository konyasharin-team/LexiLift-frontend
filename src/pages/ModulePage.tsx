import { FC } from 'react';
import { getErrorTextWithEmpty, IdSchema } from '@api';
import { ControlledComponent } from '@components/ControlledComponent';
import { idMiddleware, useParsedParams } from '@hooks';
import { useI18N } from '@i18n';
import { Grid, GridCol } from '@mantine/core';
import { wordPairs } from '@modules/matchTest/data.ts';
import {
  ModuleFlipCards,
  ModuleHead,
  MODULES_ERRORS,
  ModuleTestsButtons,
  useGetModuleAboutController,
} from '@modules/vocabularyModule';

export const ModulePage: FC = () => {
  const { t } = useI18N();
  const parsedParams = useParsedParams(IdSchema, idMiddleware);
  const controller = useGetModuleAboutController(parsedParams);

  return (
    <ControlledComponent
      {...controller.sender}
      error={getErrorTextWithEmpty(controller.apiError?.type, {
        requestErrors: MODULES_ERRORS(t),
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
    </ControlledComponent>
  );
};
