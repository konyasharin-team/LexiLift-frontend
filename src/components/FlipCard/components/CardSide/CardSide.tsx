import { FC } from 'react';
import {
  Flex,
  Paper,
  PaperProps,
  PolymorphicComponentProps,
} from '@mantine/core';

import styles from './CardSide.module.css';
import { FlipCardSide } from '@components/FlipCard/FlipCard.tsx';
import clsx from 'clsx';

export interface ICardSide
  extends PolymorphicComponentProps<'div', PaperProps> {
  text: string;
  side: FlipCardSide;
  img?: string;
}

export const CardSide: FC<ICardSide> = ({ text, side, img, ...attributes }) => {
  return (
    <Paper
      shadow="xs"
      p="xl"
      w={'100%'}
      h={'100%'}
      className={clsx(
        styles.side,
        side === 'back' ? styles.side_back : undefined,
      )}
      {...attributes}
    >
      <Flex justify={'center'} align={'center'} w={'100%'} h={'100%'}>
        {text}
      </Flex>
    </Paper>
  );
};
