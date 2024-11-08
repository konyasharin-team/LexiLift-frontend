import { FC, useEffect, useState } from 'react';
import { ITestItem } from '@app-types';
import { Flex } from '@mantine/core';
import { DraggableMatchTestCard } from '@modules/matchTest/components/DraggableMatchTestCard/DraggableMatchTestCard.tsx';
import { IUseMatchTestReturn } from '@modules/matchTest/types/IUseMatchTestReturn.ts';
import { getTestItemsByType, shuffle } from '@utils';
import {
  IDraggableMatchTestCard
} from '@modules/matchTest/types/IDraggableMatchTestCard.ts';

interface IMatchTestBoardColumnProps {
  test: IUseMatchTestReturn;
  columnItemsType: ITestItem['type'];
}

export const MatchTestBoardColumn: FC<IMatchTestBoardColumnProps> = props => {
  const [shuffledColumn, setShuffledColumn] = useState(
    shuffle(
      getTestItemsByType(props.test.draggableItems, props.columnItemsType),
    ),
  );

  useEffect(() => {
    const newShuffledColumn: IDraggableMatchTestCard[] = [];
    props.test.draggableItems.forEach(item => {
      if (shuffledColumn.some((comparingItem) => comparingItem.id === item.id)) newShuffledColumn.push()
    })
  }, [props.test.draggableItems]);

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
