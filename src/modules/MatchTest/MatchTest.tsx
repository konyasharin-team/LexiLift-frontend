import { useState } from 'react';
import { IDictionaryItem } from '@app-types/IDictionaryItem.ts';
import { Board } from '@components/Board';
import { Button, Center, Flex, Modal } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { DraggableMatchTestCard } from '@modules/MatchTest/components/DraggableMatchTestCard/DraggableMatchTestCard.tsx';
import { MatchTestCard } from '@modules/MatchTest/components/MatchTestCard/MatchTestCard.tsx';
import { useMatchTest } from '@modules/MatchTest/hooks/useMatchTest.ts';

import { getTestItemsByType } from '../../app/utils/tests/getTestItemsByType.ts';

const wordPairs: IDictionaryItem[] = [
  {
    word: 'Apple',
    translation: 'Яблоко',
  },
  {
    word: 'Apple1',
    translation: 'Яблоко1',
  },
  {
    word: 'Apple2',
    translation: 'Яблоко2',
  },
  {
    word: 'Apple3',
    translation: 'Яблоко3',
  },
  {
    word: 'Apple4',
    translation: 'Яблоко4',
  },
  {
    word: 'Apple5',
    translation: 'Яблоко5',
  },
];

export const MatchTest = () => {
  const { cards, setCards, boardRef, round, onDragEnd } =
    useMatchTest(wordPairs);
  const [errors, setErrors] = useState<number>(0);
  const [time, setTime] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const interval = useInterval(() => setTime(prevTime => prevTime + 1), 500);
  const [openedModal, setOpenedModal] = useState(false);

  const startTest = () => {
    setIsTestStarted(true);
    interval.start();
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
        items={cards}
        setItems={setCards}
        boardRef={boardRef}
        onDragEnd={onDragEnd}
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
            {getTestItemsByType(cards, 'word').map(item => (
              <DraggableMatchTestCard
                value={item.value}
                id={item.id}
                key={item.id}
              />
            ))}
          </Flex>
          <Flex gap={10} direction={'column'}>
            {getTestItemsByType(cards, 'translation').map(item => (
              <DraggableMatchTestCard
                value={item.value}
                id={item.id}
                key={item.id}
              />
            ))}
          </Flex>
        </Flex>
      </Board>
    </div>
  );
};

export default MatchTest;
