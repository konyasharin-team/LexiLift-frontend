import { FC } from 'react';
import { Box, Burger, Flex, Portal, Text } from '@mantine/core';
import clsx from 'clsx';

import styles from './Header.module.css';

interface IHeaderProps {
  title: string;
  setBurgerOpened: (newOpened: boolean) => void;
  burgerOpened: boolean;
  layoutIsActive: boolean;
}

export const Header: FC<IHeaderProps> = props => {
  return (
    <Flex
      align={'center'}
      h={'100%'}
      p={'md'}
      className={!props.layoutIsActive ? styles.hide : undefined}
    >
      <Portal>
        <Box className={clsx(styles.header)}></Box>
      </Portal>
      <Burger
        opened={props.burgerOpened}
        onClick={() => props.setBurgerOpened(!props.burgerOpened)}
        size="sm"
      />
      <Text>{props.title}</Text>
    </Flex>
  );
};
