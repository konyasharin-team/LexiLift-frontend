import { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { Button, Center, Flex, Grid, Modal } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { DraggableCard } from '@modules/KnowledgeTest/components/DragableCard/DraggableCard.tsx';
import { isMatched } from '@modules/KnowledgeTest/utils/isMatched.ts';

import { useTest } from '../../app/hooks/useTest.ts';
import { IDictionaryItem } from '../../app/types/IDictionaryItem.ts';

const wordPairs = [
  { word: 'Apple', translation: 'Яблоко' },
  { word: 'Car', translation: 'Машина' },
  { word: 'Dog', translation: 'Собака' },
  { word: 'Cucumber', translation: 'Огурец' },
];

export const KnowledgeTest = () => {
  const {
    words,
    setWords,
    translations,
    setTranslations,
    isComplete,
    setIsComplete,
  } = useTest(wordPairs, wordPairs);
  const [draggedItem, setDraggedItem] = useState<{
    type: 'word' | 'translation';
    value: string;
  } | null>(null);
  const [errors, setErrors] = useState<number>(0);
  const [time, setTime] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const interval = useInterval(() => setTime(prevTime => prevTime + 1), 500);
  const [matchedItems, setMatchedItems] = useState<IDictionaryItem[]>([]);
  const [shakeWord, setShakeWord] = useState<string | null>(null);
  const [shakeTranslation, setShakeTranslation] = useState<string | null>(null);
  const [openedModal, setOpenedModal] = useState(false);
  const [correctMatch, setCorrectMatch] = useState<{
    word: string;
    translation: string;
  } | null>(null);
  const [wrongMatchWord, setWrongMatchWord] = useState<string | null>(null);
  const [wrongMatchTranslation, setWrongMatchTranslation] = useState<
    string | null
  >(null);

  const startTest = () => {
    setIsTestStarted(true);
    interval.start();
  };

  const triggerShake = (
    type: 'word' | 'translation',
    value: string,
    duration: number,
  ) => {
    if (type === 'word') {
      setShakeWord(value);
    } else {
      setShakeTranslation(value);
    }

    setTimeout(() => {
      setShakeWord(null);
      setShakeTranslation(null);
      setWrongMatchWord(null);
      setWrongMatchTranslation(null);
    }, duration);
  };

  const checkMatch = (word: string, translation: string) => {
    const match = wordPairs.find(
      pair => pair.word === word && pair.translation === translation,
    );

    if (match) {
      setCorrectMatch({ word, translation });

      setTimeout(() => {
        setCorrectMatch(null);
        setWords(prevWords => prevWords.filter(w => w.word !== word));
        setTranslations(prevTranslations =>
          prevTranslations.filter(t => t.translation !== translation),
        );

        setMatchedItems(prev => [...prev, { word, translation }]);
      }, 500);
    } else {
      setErrors(prevErrors => prevErrors + 1);

      // Если тянем слово к переводу
      if (draggedItem?.type === 'word') {
        setWrongMatchTranslation(translation);
      }

      // Если тянем перевод к слову
      if (draggedItem?.type === 'translation') {
        setWrongMatchWord(word);
      }

      triggerShake('word', word, 1000);
      triggerShake('translation', translation, 1000);
    }

    if (words.length === 1 && translations.length === 1) {
      setTimeout(() => {
        interval.stop();
        setIsComplete(true);
        setOpenedModal(true);
      }, 600);
    }
  };

  const handleOnDragEnd = (result: DropResult) => {
    console.log('Drag result:', result);
    if (!result.destination) return;

    const { source, destination } = result;
    console.log('Moved from:', source);
    console.log('Moved to:', destination);

    // Если перемещаем элемент из одного списка в другой
    if (
      source.droppableId === 'words' &&
      destination.droppableId === 'translations'
    ) {
      const draggedWord = words[source.index].word;
      const targetTranslation = translations[destination.index].translation;
      checkMatch(draggedWord, targetTranslation);
    } else if (
      source.droppableId === 'translations' &&
      destination.droppableId === 'words'
    ) {
      const draggedTranslation = translations[source.index].translation;
      const targetWord = words[destination.index].word;
      checkMatch(targetWord, draggedTranslation);
    }
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
          {isComplete ? (
            <></>
          ) : (
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Grid justify="center" align="center" gutter="md">
                <Droppable droppableId="words">
                  {provided => (
                    <Grid.Col span={2} mr={500}>
                      <h3>Слова</h3>
                      <Flex
                        gap={10}
                        direction="column"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {words.map((word, index) => (
                          <Draggable
                            key={word.word}
                            draggableId={word.word}
                            index={index}
                          >
                            {provided => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <DraggableCard
                                  value={word.word}
                                  type="word"
                                  isDragging={isMatched(
                                    matchedItems,
                                    word.word,
                                    '',
                                  )}
                                  isCorrect={correctMatch?.word === word.word}
                                  isWrong={wrongMatchWord === word.word}
                                  isShaking={shakeWord === word.word}
                                  onDragStart={() =>
                                    setDraggedItem({
                                      type: 'word',
                                      value: word.word,
                                    })
                                  }
                                  onDrop={() => {
                                    if (draggedItem?.type === 'translation') {
                                      checkMatch(word.word, draggedItem.value);
                                      setDraggedItem(null);
                                    }
                                  }}
                                  onDragEnd={() => setDraggedItem(null)}
                                  onDragOver={e => e.preventDefault()}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </Flex>
                    </Grid.Col>
                  )}
                </Droppable>

                <Droppable droppableId="translations">
                  {provided => (
                    <Grid.Col span={2}>
                      <h3>Переводы</h3>
                      <Flex
                        gap={10}
                        direction="column"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {translations.map((translation, index) => (
                          <Draggable
                            key={translation.translation}
                            draggableId={translation.translation}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <DraggableCard
                                  value={translation.translation}
                                  type="translation"
                                  isDragging={snapshot.isDragging}
                                  isCorrect={
                                    correctMatch?.translation ===
                                    translation.translation
                                  }
                                  isWrong={
                                    wrongMatchTranslation ===
                                    translation.translation
                                  }
                                  isShaking={
                                    shakeTranslation === translation.translation
                                  }
                                  onDragStart={() =>
                                    setDraggedItem({
                                      type: 'translation',
                                      value: translation.translation,
                                    })
                                  }
                                  onDrop={() => {}}
                                  onDragEnd={() => {}}
                                  onDragOver={e => e.preventDefault()}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Flex>
                    </Grid.Col>
                  )}
                </Droppable>
              </Grid>
            </DragDropContext>
          )}
        </div>
      )}
    </div>
  );
};

export default KnowledgeTest;
