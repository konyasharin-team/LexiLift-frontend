import { FC, memo } from 'react';
import { ITestItem } from '@app-types';
import { Flex } from '@mantine/core';
import { useMatchTest } from '@modules/matchTest';
import { MatchTestDraggableCard } from '@modules/matchTest/components/MatchTestDraggableCard/MatchTestDraggableCard.tsx';
import { getTestItemsByType } from '@utils';

interface IMatchTestBoardColumnProps
  extends Pick<
    ReturnType<typeof useMatchTest>,
    'items' | 'animations' | 'isStarted' | 'showCardsAnimationScope'
  > {
  columnItemsType: ITestItem['type'];
}

export const MatchTestBoardColumn: FC<IMatchTestBoardColumnProps> = memo(
  props => {
    return (
      <Flex gap={10} direction={'column'} style={{ transform: 'scale(0)' }}>
        {getTestItemsByType(props.items, props.columnItemsType).map(item => (
          <MatchTestDraggableCard
            animation={props.animations.find(
              animation => animation.itemId === item.id,
            )}
            {...item}
            isDisabled={!props.isStarted || props.animations.length > 0}
            key={item.id}
          />
        ))}
      </Flex>
    );
  },
);
