import { forwardRef, ReactNode, useContext } from 'react';
import { ListContext } from '@components/List/context/ListContext.ts';
import { GridCol, ScrollArea, useMantineTheme } from '@mantine/core';
import { motion, Variants } from 'framer-motion';

interface IListItemProps {
  index: number;
  onSelect?: () => void;
  children?: ReactNode;
}

const variants: Variants = {
  offScreen: {
    y: 300,
    opacity: 0,
  },
  onScreen: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
      delay: index * 0.1,
    },
  }),
  hovered: {
    scale: 1.05,
    borderBottom: '2px solid var(--mantine-color-blue-filled)',
  },
  selected: {
    scale: 0.95,
    borderBottom: '2px solid var(--mantine-color-blue-filled)',
  },
};

export const ListItem = forwardRef<HTMLDivElement, IListItemProps>(
  (props, ref) => {
    const context = useContext(ListContext);
    const theme = useMantineTheme();
    const span =
      context?.span && context.span <= 12 && context.span > 0
        ? context.span
        : 12;
    return (
      <GridCol span={span} ref={ref}>
        <motion.div
          variants={variants}
          initial={'offScreen'}
          whileInView={'onScreen'}
          exit={{ scale: 0.8, opacity: 0 }}
          layout={true}
          custom={props.index % Math.floor(12 / span)}
          viewport={{ once: true, amount: 0.1 }}
          style={{
            padding: theme.spacing.md,
            paddingRight: 0,
            boxShadow: `0 0 10px ${theme.colors.dark[0]}`,
            height: context?.height ?? 'fit-content',
            cursor: props.onSelect ? 'pointer' : undefined,
            backgroundColor: theme.white,
            borderRadius: theme.radius.md,
          }}
          whileHover={props.onSelect ? 'hovered' : undefined}
          whileTap={props.onSelect ? 'selected' : undefined}
          onClick={props.onSelect}
        >
          <ScrollArea h={'100%'} offsetScrollbars={'y'}>
            {props.children}
          </ScrollArea>
        </motion.div>
      </GridCol>
    );
  },
);
