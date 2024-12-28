import { FC } from 'react';
import { AchievementsBoard } from '@modules/achievements';
import { achievements } from '@modules/achievements/data.ts';

export const AchievementsPage: FC = () => {
  return <AchievementsBoard achievements={achievements} />;
};
