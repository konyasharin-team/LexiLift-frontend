import { FC, useEffect } from 'react';
import { DictionaryCardSchemaInfer } from '@app-types';
import { FlipCard, useFlipCard } from '@components/FlipCard';
import { Box, Button, Center, Flex } from '@mantine/core';
import { useFlipCards } from '@modules/vocabularyModule';
import { useModuleFlipCardsAnimation } from '@modules/vocabularyModule/hooks/useModuleFlipCardsAnimation.ts';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';

interface IModuleFlipCardsProps {
  cards: DictionaryCardSchemaInfer[];
}

export const ModuleFlipCards: FC<IModuleFlipCardsProps> = props => {
  const { playLeft, playRight, scope } = useModuleFlipCardsAnimation();
  const { currentSide, toggleCurrentSide, setImgIsVisible, imgIsVisible } =
    useFlipCard();
  const controller = useFlipCards(props.cards);

  useEffect(() => {
    setImgIsVisible(false);
  }, [controller.current]);

  return (
    <Box w={'100%'}>
      <Center>
        <Flex direction={'column'} gap={20} w={'100%'} h={600}>
          <motion.div style={{ perspective: 500, height: '450px' }} ref={scope}>
            <FlipCard
              word={controller.current?.word ?? ''}
              translation={controller.current?.translation ?? ''}
              translationImg={controller.current?.img}
              imgIsVisible={imgIsVisible}
              setImgIsVisible={setImgIsVisible}
              activeSide={currentSide}
              onClick={() => toggleCurrentSide()}
            />
          </motion.div>
          <Flex justify={'space-between'} gap={10} w={'100%'}>
            <Button
              fullWidth={true}
              disabled={controller.isStart}
              onClick={() => {
                controller.previous();
                playLeft();
              }}
              size={'lg'}
            >
              <IconArrowLeft />
            </Button>
            <Button
              fullWidth={true}
              disabled={controller.isEnd}
              onClick={() => {
                controller.next();
                playRight();
              }}
              size={'lg'}
            >
              <IconArrowRight />
            </Button>
          </Flex>
        </Flex>
      </Center>
    </Box>
  );
};
