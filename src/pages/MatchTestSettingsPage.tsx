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
  const formController = useMatchTestSettingsForm();

  useRequestEvents(getModuleApiController.sender, {
    onSuccess: result => {
      if (result) {
        formController.form.setValues(
          createBaseSettings(moduleFromBackendFieldsTransform(result).words),
        );
        setMatchTestModule({
          ...result,
          ...moduleFromBackendFieldsTransform(result),
        });
      } else navigate(appPaths.MODULES);
    },
  });

  return (
    <ControlledComponent
      {...getModuleApiController.sender}
      error={getErrorTextWithEmpty(getModuleApiController.apiError?.type, {
        requestErrors: MODULES_ERRORS(t),
      })}
      dependencies={[formController.form.values]}
    >
      {result => (
        <MatchTestSettingsPanel
          {...formController}
          maxWordsCount={result?.words.length}
        />
      )}
    </ControlledComponent>
  );
};
