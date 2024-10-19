import { FC } from 'react';
import { ITestItem } from '@app-types/ITestItem.ts';
import { Flex } from '@mantine/core';
import { DraggableMatchTestCard } from '@modules/matchTest/components/DraggableMatchTestCard/DraggableMatchTestCard.tsx';
import { IUseMatchTestReturn } from '@modules/matchTest/types/IUseMatchTestReturn.ts';
import { getTestItemsByType } from '@utils/tests';

interface IMatchTestBoardColumnProps {
  test: IUseMatchTestReturn;
  columnItemsType: ITestItem['type'];
}

export const MatchTestBoardColumn: FC<IMatchTestBoardColumnProps> = props => {
  return (
    <Flex gap={10} direction={'column'}>
      {getTestItemsByType(props.test.draggableItems, props.columnItemsType).map(
        item => (
          <DraggableMatchTestCard
            animation={props.test.animations.find(
              animation => animation.itemId === item.id,
            )}
            {...item}
            isDisabled={
              props.test.animations.length > 0 || !props.test.isStarted
            }
            key={item.id}
          />
        ),
      )}
    </Flex>
  );
};
