import { forwardRef } from 'react';
import { Card, CardProps, Text } from '@mantine/core';
import { IDraggableMatchTestCard } from '@modules/MatchTest/types/IDraggableMatchTestCard.ts';
import clsx from 'clsx';

import styles from './MatchTestCard.module.css';

interface IMatchTestCardProps extends CardProps {
  children?: IDraggableMatchTestCard['value'];
}

export const MatchTestCard = forwardRef<HTMLDivElement, IMatchTestCardProps>(
  ({ children, className, ...attributes }, ref) => {
    return (
      <Card
        shadow="sm"
        p="sm"
        radius="md"
        withBorder
        ref={ref}
        className={clsx(styles.card, className)}
        {...attributes}
      >
        <Text>{children}</Text>
      </Card>
    );
  },
);
