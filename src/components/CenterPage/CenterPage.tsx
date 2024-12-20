import { FC, ReactNode } from 'react';
import { Flex } from '@mantine/core';

import styles from './CenterPage.module.css';

interface ICenterPageProps {
  deltaY?: number;
  children?: ReactNode;
}

export const CenterPage: FC<ICenterPageProps> = props => {
  return (
    <div className={styles.center}>
      <Flex justify={'center'} align={'center'} h={'100%'} pb={props.deltaY}>
        {props.children}
      </Flex>
    </div>
  );
};
