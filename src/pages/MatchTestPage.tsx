import { FC } from 'react';
import { MatchTestAnimationsController } from '@modules/MatchTest/components/MatchTestAnimationsController/MatchTestAnimationsController.tsx';
import { MatchTest } from '@modules/MatchTest/MatchTest.tsx';

export const MatchTestPage: FC = () => {
  return (
    <MatchTestAnimationsController>
      <MatchTest />
    </MatchTestAnimationsController>
  );
};
