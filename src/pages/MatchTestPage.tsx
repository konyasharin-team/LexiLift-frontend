import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import {
  MatchTestAnswersStatistics,
  MatchTestBoard,
  MatchTestDescription,
  MatchTestInfoPanel,
  MatchTestTimer,
  MatchTestWrapper,
  useMatchTest,
} from '@modules/matchTest';
import { appPaths } from '@routes';
import { useAppSelector } from '@store';
import { toTime } from '@utils';

export const MatchTestPage: FC = () => {
  const { settings, module } = useAppSelector(state => state.matchTest);
  const matchTest = useMatchTest(module?.words ?? []);

  if (!settings || !module || module.words.length === 0)
    return <Navigate to={appPaths.MATCH_TEST_SETTINGS} />;
  return (
    <MatchTestWrapper
      blurIsActive={!matchTest.isStarted}
      start={matchTest.start}
    >
      <MatchTestInfoPanel>
        <MatchTestTimer time={toTime({ milliseconds: matchTest.time })} />
        <MatchTestDescription>
          Перетаскивайте слова на правильные переводы и наоборот
        </MatchTestDescription>
        <MatchTestAnswersStatistics
          statistics={matchTest.statistics}
          successAnimationScope={matchTest.successAnimationScope}
          errorAnimationScope={matchTest.errorAnimationScope}
        />
      </MatchTestInfoPanel>
      <MatchTestBoard
        showCardsAnimationScope={matchTest.showCardsAnimationScope}
        boardRef={matchTest.boardRef}
        onDragEnd={matchTest.onDragEnd}
        isStarted={matchTest.isStarted}
        items={matchTest.items}
        animations={matchTest.animations}
      />
    </MatchTestWrapper>
  );
};
