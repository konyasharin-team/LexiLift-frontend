import { FC } from 'react';
import { AppLayout } from '@components/AppLayout';
import {
  MatchTestSettingsPanel,
  useMatchTestSettingsForm,
} from '@modules/matchTest';
import { wordPairs } from '@modules/matchTest/data.ts';
import { createBaseSettings } from '@utils';

export const MatchTestSettingsPage: FC = () => {
  const formController = useMatchTestSettingsForm(
    createBaseSettings(wordPairs),
  );

  return (
    <AppLayout>
      <MatchTestSettingsPanel {...formController} />
    </AppLayout>
  );
};
