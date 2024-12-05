import { FC, ReactNode } from 'react';
import { Flex } from '@mantine/core';

import styles from './CardSideHead.module.css';

interface ICardSideHead {
  children?: ReactNode;
}

export const CardSideHead: FC<ICardSideHead> = props => {
  return (
    <Flex
      pos={'absolute'}
      gap={10}
      align={'center'}
      className={styles.cardSide}
    >
      {props.children}
    </Flex>
  );
};
