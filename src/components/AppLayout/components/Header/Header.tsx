import { FC } from 'react';
import { Box, Portal, Text } from '@mantine/core';
import clsx from 'clsx';

import styles from './Header.module.css';

interface IHeaderProps {
  pinned: boolean;
  data: {
    title: string;
  };
}

export const Header: FC<IHeaderProps> = ({ pinned, data }) => {
  return (
    <>
      <Portal>
        <Box
          className={clsx(
            styles.header,
            pinned ? styles.header_pinned : styles.header_unpinned,
          )}
        ></Box>
      </Portal>
      <Text>{data.title}</Text>
    </>
  );
};
