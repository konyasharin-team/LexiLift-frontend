import { FC } from 'react';
import { getErrorTextWithEmpty, IdSchema } from '@api';
import { ControlledComponent } from '@components/ControlledComponent';
import { idMiddleware, useParsedParams } from '@hooks';
import { useI18N } from '@i18n';
import { Grid, GridCol } from '@mantine/core';
import {
  ModuleFlipCards,
  ModuleHead,
  MODULES_ERRORS,
  ModuleTestsButtons,
  useGetModuleAboutController,
} from '@modules/vocabularyModule';
import { moduleFromBackendFieldsTransform } from '@modules/vocabularyModule/utils/moduleFromBackendFieldsTransform.ts';

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
            <ModuleHead countWords={result.words.length} {...result} />
            <Grid mt={50} gutter={'md'}>
              <GridCol span={3}>
                <ModuleTestsButtons />
              </GridCol>
              <GridCol span={9}>
                <ModuleFlipCards
                  cards={moduleFromBackendFieldsTransform(result).words}
                />
              </GridCol>
            </Grid>
          </div>
        ) : undefined
      }
    </ControlledComponent>
  );
};
