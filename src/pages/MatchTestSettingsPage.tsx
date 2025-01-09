import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorTextWithEmpty, IdSchema, useRequestEvents } from '@api';
import { ControlledComponent } from '@components/ControlledComponent';
import { idMiddleware, useParsedParams } from '@hooks';
import { useI18N } from '@i18n';
import {
  MatchTestSettingsPanel,
  useMatchTestSettingsForm,
} from '@modules/matchTest';
import {
  moduleFromBackendFieldsTransform,
  MODULES_ERRORS,
  useGetModuleAboutController,
} from '@modules/vocabularyModule';
import { appPaths } from '@routes';
import { useActions } from '@store';
import { createBaseSettings } from '@utils';

export const MatchTestSettingsPage: FC = () => {
  const parsedParams = useParsedParams(IdSchema, idMiddleware);
  const getModuleApiController = useGetModuleAboutController(parsedParams);
  const { t } = useI18N();
  const { setMatchTestModule } = useActions();
  const navigate = useNavigate();

  const formController = useMatchTestSettingsForm(
    getModuleApiController.sender.response?.data.result
      ? createBaseSettings(
          moduleFromBackendFieldsTransform(
            getModuleApiController.sender.response.data.result,
          ).words,
        )
      : undefined,
  );

  useRequestEvents(getModuleApiController.sender, {
    onSuccess: result => {
      if (result)
        setMatchTestModule({
          ...result,
          ...moduleFromBackendFieldsTransform(result),
        });
      else navigate(appPaths.MODULES);
    },
  });

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
