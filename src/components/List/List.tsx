import { FC, ReactNode } from 'react';
import { ListContext } from '@components/List/context/ListContext.ts';
import { Grid } from '@mantine/core';
import { AnimatePresence } from 'framer-motion';

export interface IListProps {
  span?: number;
  height?: number;
  children?: ReactNode;
}

export const List: FC<IListProps> = props => {
  return (
    <ListContext.Provider value={props}>
      <Grid gutter={'md'}>
        <AnimatePresence mode={'popLayout'}>{props.children}</AnimatePresence>
      </Grid>
    </ListContext.Provider>
  );
};
