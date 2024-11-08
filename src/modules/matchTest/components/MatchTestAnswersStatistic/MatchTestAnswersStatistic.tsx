import { FC, ReactNode } from 'react';
import { MantineStyleProps, Paper, Text } from '@mantine/core';
import { useMatchTestStatisticAnimation } from '@modules/matchTest/hooks/useMatchTestStatisticAnimation.ts';
import { animated } from '@react-spring/web';
import { appColors } from '@themes';
import { CenterFlex } from '@ui/CenterFlex';

import styles from './MatchTestAnswersStatistic.module.css';

interface IMatchTestAnswersStatisticProps
  extends Pick<MantineStyleProps, 'bg'> {
  style?: ReturnType<typeof useMatchTestStatisticAnimation>['styles'];
  children?: ReactNode;
}

export const MatchTestAnswersStatistic: FC<
  IMatchTestAnswersStatisticProps
> = props => {
  return (
    <animated.div className={styles.block} style={props.style}>
      <Paper bg={props.bg} c={appColors.white[0]} h={'100%'} w={'100%'}>
        <CenterFlex>
          <Text className={'title'}>{props.children}</Text>
        </CenterFlex>
      </Paper>
    </animated.div>
  );
};
