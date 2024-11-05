import { FC } from 'react';
import { Box, Burger, Flex, Portal, Text } from '@mantine/core';
import clsx from 'clsx';

import styles from './Header.module.css';

interface IHeaderProps {
  pinned: boolean;
  title: string;
  toggle: () => void;
  opened: boolean;
}

export const Header: FC<IHeaderProps> = props => {
  return (
    <Flex align={'center'} h={'100%'} p={'md'}>
      <Portal>
        <Box
          className={clsx(
            styles.header,
            props.pinned ? styles.header_pinned : styles.header_unpinned,
          )}
        ></Box>
      </Portal>
      <Text>{props.title}</Text>
      <Burger opened={props.opened} onClick={props.toggle} size="sm" />
    </Flex>
  );
};
