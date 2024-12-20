import { FC, ReactNode } from 'react';
import { MantineStyleProps, Paper, Text } from '@mantine/core';
import { useMatchTestStatisticAnimation } from '@modules/matchTest/hooks/useMatchTestStatisticAnimation.ts';
import { appColors } from '@themes';
import { CenterFlex } from '@ui/CenterFlex';

interface IMatchTestAnswersStatisticProps
  extends Pick<MantineStyleProps, 'bg'> {
  scope?: ReturnType<typeof useMatchTestStatisticAnimation>['scope'];
  children?: ReactNode;
}

export const MatchTestAnswersStatistic: FC<
  IMatchTestAnswersStatisticProps
> = props => {
  return (
    <Paper
      ref={props.scope}
      bg={props.bg}
      c={appColors.white[0]}
      h={'100%'}
      w={'100%'}
    >
      <CenterFlex>
        <Text className={'title'}>{props.children}</Text>
      </CenterFlex>
    </Paper>
  );
};
