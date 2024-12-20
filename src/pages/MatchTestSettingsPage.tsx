import { FC } from 'react';
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

  return <MatchTestSettingsPanel {...formController} />;
};
