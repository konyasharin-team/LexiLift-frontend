import { FC } from 'react';
import { ITestItem } from '@app-types';
import { Flex } from '@mantine/core';
import { MatchTestDraggableCard } from '@modules/matchTest/components/MatchTestDraggableCard/MatchTestDraggableCard.tsx';
import { IUseMatchTestReturn } from '@modules/matchTest/types/IUseMatchTestReturn.ts';
import { getTestItemsByType } from '@utils';

interface IMatchTestBoardColumnProps {
  test: IUseMatchTestReturn;
  columnItemsType: ITestItem['type'];
}

export const MatchTestBoardColumn: FC<IMatchTestBoardColumnProps> = props => {
  return (
    <Flex gap={10} direction={'column'}>
      {getTestItemsByType(props.test.items, props.columnItemsType).map(item => (
        <MatchTestDraggableCard
          animation={props.test.animations.find(
            animation => animation.itemId === item.id,
          )}
          {...item}
          isDisabled={props.test.animations.length > 0 || !props.test.isStarted}
          key={item.id}
        />
      ))}
    </Flex>
  );
};
