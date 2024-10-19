import { FC } from 'react';
import { Board } from '@components/Board';
import { Flex } from '@mantine/core';
import { MatchTestBoardColumn } from '@modules/matchTest/components/MatchTestBoardColumn/MatchTestBoardColumn.tsx';
import { MatchTestCard } from '@modules/matchTest/components/MatchTestCard/MatchTestCard.tsx';
import { IUseMatchTestReturn } from '@modules/matchTest/types/IUseMatchTestReturn.ts';

interface IMatchTestBoardProps {
  test: IUseMatchTestReturn;
}

export const MatchTestBoard: FC<IMatchTestBoardProps> = props => {
  return (
    <Board
      items={props.test.items}
      setItems={props.test.setItems}
      boardRef={props.test.boardRef}
      onDragEnd={props.test.onDragEnd}
      activeItemToReactNode={item => {
        if (item) {
          return <MatchTestCard>{item.value}</MatchTestCard>;
        }
        return null;
      }}
    >
      <Flex
        justify={'space-between'}
        align={'start'}
        w={'100%'}
        pt={30}
        pr={250}
        pl={250}
      >
        <MatchTestBoardColumn test={props.test} columnItemsType={'word'} />
        <MatchTestBoardColumn
          test={props.test}
          columnItemsType={'translation'}
        />
      </Flex>
    </Board>
  );
};
