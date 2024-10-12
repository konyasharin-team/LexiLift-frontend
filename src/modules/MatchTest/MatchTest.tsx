import { FC, useState } from 'react';
import { Board } from '@components/Board';
import { Button, Center, Flex, Modal } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { onDragEnd } from '@modules/MatchTest/boardEvents/onDragEnd.ts';
import { DraggableMatchTestCard } from '@modules/MatchTest/components/DraggableMatchTestCard/DraggableMatchTestCard.tsx';
import { MatchTestCard } from '@modules/MatchTest/components/MatchTestCard/MatchTestCard.tsx';
import { IUseMatchTestReturn } from '@modules/MatchTest/types/IUseMatchTestReturn.ts';
import { getTestItemsByType } from '@utils/tests';

export const MatchTest: FC<IUseMatchTestReturn> = props => {
  const [errors, setErrors] = useState<number>(0);
  const [time, setTime] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const interval = useInterval(() => setTime(prevTime => prevTime + 1), 500);
  const [openedModal, setOpenedModal] = useState(false);

  const startTest = () => {
    setIsTestStarted(true);
    interval.start();
    props.start?.();
  };

  return (
    <div>
      {!isTestStarted ? (
        <Center mt={20}>
          <Button onClick={startTest}>Старт</Button>
        </Center>
      ) : (
        <div>
          <Center>
            <h2>Сопоставьте слова с переводами</h2>
          </Center>
          <Modal opened={openedModal} onClose={() => setOpenedModal(false)}>
            <Center>
              <div>
                <h3>Тест завершён!</h3>
                <p>Ошибки: {errors}</p>
                <p>Время: {time} секунд</p>
              </div>
            </Center>
          </Modal>
        </div>
      )}
      <Board
        items={props.cards}
        setItems={props.setCards}
        boardRef={props.boardRef}
        onDragEnd={e => onDragEnd(e, props.answers, props.addAnimations)}
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
            {getTestItemsByType(props.cards, 'word').map(item => (
              <DraggableMatchTestCard
                animation={props.animations.find(
                  animation => animation.itemId === item.id,
                )}
                value={item.value}
                id={item.id}
                type={'word'}
                key={item.id}
              />
            ))}
          </Flex>
          <Flex gap={10} direction={'column'}>
            {getTestItemsByType(props.cards, 'translation').map(item => (
              <DraggableMatchTestCard
                animation={props.animations.find(
                  animation => animation.itemId === item.id,
                )}
                value={item.value}
                id={item.id}
                type={'translation'}
                key={item.id}
              />
            ))}
          </Flex>
        </Flex>
      </Board>
    </div>
  );
};
