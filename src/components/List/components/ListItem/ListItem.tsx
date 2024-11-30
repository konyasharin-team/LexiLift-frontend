import { forwardRef, ReactNode, useContext } from 'react';
import { ListContext } from '@components/List/context/ListContext.ts';
import { GridCol, Paper } from '@mantine/core';
import { motion } from 'framer-motion';

interface IListItemProps {
  children?: ReactNode;
}

export const ListItem = forwardRef<HTMLDivElement, IListItemProps>(
  (props, ref) => {
    const context = useContext(ListContext);
    return (
      <GridCol span={context?.span ?? 3} ref={ref}>
        <motion.div
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          layout={true}
        >
          <Paper p={'md'} shadow={'sm'} h={context?.height ?? 250}>
            {props.children}
          </Paper>
        </motion.div>
      </GridCol>
    );
  },
);
