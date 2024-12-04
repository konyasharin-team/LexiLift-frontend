import { FC, ReactNode } from 'react';
import { CardSideHead } from '@components/FlipCard/components/CardSideHead/CardSideHead.tsx';
import { FlipCardSide } from '@components/FlipCard/FlipCard.tsx';
import {
  Center,
  Flex,
  Image,
  Paper,
  PaperProps,
  PolymorphicComponentProps,
  Text,
  useMantineTheme,
} from '@mantine/core';
import clsx from 'clsx';

import styles from './CardSide.module.css';

export interface ICardSide
  extends PolymorphicComponentProps<'div', PaperProps> {
  text: string;
  side: FlipCardSide;
  img?: {
    url: string;
    isVisible: boolean;
  };
  headContent?: ReactNode;
}

export const CardSide: FC<ICardSide> = ({
  text,
  side,
  img,
  headContent,
  ...attributes
}) => {
  const theme = useMantineTheme();
  return (
    <Paper
      shadow="md"
      bg={theme.white}
      p="xl"
      w={'100%'}
      h={'100%'}
      radius={'lg'}
      className={clsx(
        styles.side,
        side === 'back' ? styles.sideBack : undefined,
      )}
      {...attributes}
    >
      <CardSideHead>{headContent}</CardSideHead>
      <Center w={'100%'} h={'100%'}>
        <Flex
          justify={'center'}
          align={'center'}
          direction={'column'}
          w={'100%'}
          h={'60%'}
          pos={'relative'}
          className={styles.content}
        >
          <Text fw={700} fz={'xl'} tt={'capitalize'}>
            {text}
          </Text>
          {img ? (
            <Image
              radius={'lg'}
              src={img.url}
              maw={300}
              mah={100}
              fit={'contain'}
              className={clsx(
                styles.img,
                img.isVisible ? styles.imgActive : styles.imgDisabled,
              )}
            />
          ) : undefined}
        </Flex>
      </Center>
    </Paper>
  );
};
