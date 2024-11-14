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
import { wordPairs } from '@modules/matchTest/data.ts';
import { appPaths } from '@routes';
import { useAppSelector } from '@store';
import { toTime } from '@utils';

export const MatchTestPage: FC = () => {
  const matchTest = useMatchTest(wordPairs);
  const { settings } = useAppSelector(state => state.matchTest);

  if (!settings) return <Navigate to={appPaths.MATCH_TEST_SETTINGS} />;
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
        setItems={matchTest.setItems}
        animations={matchTest.animations}
      />
    </MatchTestWrapper>
  );
};
