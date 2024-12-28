import { FC } from 'react';
import { getErrorTextWithEmpty, IdSchema } from '@api';
import { ControlledComponent } from '@components/ControlledComponent';
import { idMiddleware, useParsedParams } from '@hooks';
import { useI18N } from '@i18n';
import {
  MatchTestSettingsPanel,
  useMatchTestSettingsForm,
} from '@modules/matchTest';
import {
  MODULES_ERRORS,
  useGetModuleAboutController,
} from '@modules/vocabularyModule';
import { moduleFromBackendFieldsTransform } from '@modules/vocabularyModule/utils/moduleFromBackendFieldsTransform.ts';
import { createBaseSettings } from '@utils';

export const MatchTestSettingsPage: FC = () => {
  const parsedParams = useParsedParams(IdSchema, idMiddleware);
  const getModuleApiController = useGetModuleAboutController(parsedParams);
  const { t } = useI18N();

  const formController = useMatchTestSettingsForm(
    getModuleApiController.sender.response?.data.result
      ? createBaseSettings(
          moduleFromBackendFieldsTransform(
            getModuleApiController.sender.response.data.result,
          ).words,
        )
      : undefined,
  );

  return (
    <ControlledComponent
      {...getModuleApiController.sender}
      error={getErrorTextWithEmpty(getModuleApiController.apiError?.type, {
        requestErrors: MODULES_ERRORS(t),
      })}
    >
      {() => <MatchTestSettingsPanel {...formController} />}
    </ControlledComponent>
  );
};
