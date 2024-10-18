import { FC, useState } from 'react';
import { Board } from '@components/Board';
import { Button, Flex } from '@mantine/core';
import { DraggableMatchTestCard } from '@modules/MatchTest/components/DraggableMatchTestCard/DraggableMatchTestCard.tsx';
import { MatchTestCard } from '@modules/MatchTest/components/MatchTestCard/MatchTestCard.tsx';
import { MatchTestInfoPanel } from '@modules/MatchTest/components/MatchTestInfoPanel/MatchTestInfoPanel.tsx';
import { MatchTestTimer } from '@modules/MatchTest/components/MatchTestTimer/MatchTestTimer.tsx';
import { IUseMatchTestReturn } from '@modules/MatchTest/types/IUseMatchTestReturn.ts';
import { getTestItemsByType } from '@utils/tests';
import { toTime } from '@utils/time';

export const MatchTest: FC<IUseMatchTestReturn> = props => {
  const [errors, setErrors] = useState<number>(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [openedModal, setOpenedModal] = useState(false);

  const startTest = () => {
    setIsTestStarted(true);
    props.timer.start();
    props.start?.();
  };

  return (
    <div>
      <MatchTestInfoPanel>
        <Button onClick={startTest}>click</Button>
        <MatchTestTimer time={toTime({ seconds: props.timer.seconds })} />
      </MatchTestInfoPanel>
      <Board
        items={props.cards}
        setItems={props.setCards}
        boardRef={props.boardRef}
        onDragEnd={props.onDragEnd}
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
          <Flex gap={10} direction={'column'}>
            {getTestItemsByType(props.draggableItems, 'word').map(item => (
              <DraggableMatchTestCard
                animation={props.animations.find(
                  animation => animation.itemId === item.id,
                )}
                {...item}
                key={item.id}
              />
            ))}
          </Flex>
          <Flex gap={10} direction={'column'}>
            {getTestItemsByType(props.draggableItems, 'translation').map(
              item => (
                <DraggableMatchTestCard
                  animation={props.animations.find(
                    animation => animation.itemId === item.id,
                  )}
                  {...item}
                  key={item.id}
                />
              ),
            )}
          </Flex>
        </Flex>
      </Board>
    </div>
  );
};
