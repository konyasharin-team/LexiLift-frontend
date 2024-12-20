import { FC, memo } from 'react';
import { Board } from '@components/Board';
import { Flex } from '@mantine/core';
import { MatchTestBoardColumn } from '@modules/matchTest/components/MatchTestBoardColumn/MatchTestBoardColumn.tsx';
import { MatchTestCard } from '@modules/matchTest/components/MatchTestCard/MatchTestCard.tsx';
import { IUseMatchTestReturn } from '@modules/matchTest/types/IUseMatchTestReturn.ts';
import { motion } from 'framer-motion';

export const MatchTestBoard: FC<
  Pick<
    IUseMatchTestReturn,
    | 'items'
    | 'setItems'
    | 'boardRef'
    | 'onDragEnd'
    | 'animations'
    | 'isStarted'
    | 'showCardsAnimationScope'
  >
> = memo(props => {
  return (
    <Board
      items={props.items}
      setItems={props.setItems}
      boardRef={props.boardRef}
      onDragEnd={props.onDragEnd}
      activeItemToReactNode={item => {
        if (item) {
          return <MatchTestCard>{item.value}</MatchTestCard>;
        }
        return null;
      }}
    >
      <motion.div ref={props.showCardsAnimationScope}>
        <Flex
          justify={'space-between'}
          align={'start'}
          w={'100%'}
          pt={30}
          pr={250}
          pl={250}
        >
          <MatchTestBoardColumn columnItemsType={'word'} {...props} />
          <MatchTestBoardColumn columnItemsType={'translation'} {...props} />
        </Flex>
      </motion.div>
    </Board>
  );
});
