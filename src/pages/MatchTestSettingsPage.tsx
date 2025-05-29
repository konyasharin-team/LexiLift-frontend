import { FC } from 'react';
import { getErrorTextWithEmpty } from '@api';
import { ControlledComponent } from '@components/ControlledComponent';
import { useI18N } from '@i18n';
import { MatchTestSettingsPanel } from '@modules/matchTest';
import { useTestSettings } from '@modules/sharedTest';
import { MODULES_ERRORS } from '@modules/vocabularyModule';

export const MatchTestSettingsPage: FC = () => {
  const { t } = useI18N();
  const { formController, getModuleApiController } = useTestSettings('match');

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
