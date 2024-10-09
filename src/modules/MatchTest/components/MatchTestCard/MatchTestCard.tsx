import { forwardRef } from 'react';
import { Card, CardProps, Text } from '@mantine/core';
import { IDraggableMatchTestCard } from '@modules/MatchTest/types/IDraggableMatchTestCard.ts';

interface IMatchTestCardProps extends CardProps {
  children?: IDraggableMatchTestCard['value'];
}

export const MatchTestCard = forwardRef<HTMLDivElement, IMatchTestCardProps>(
  ({ children, ...attributes }, ref) => {
    return (
      <Card shadow="sm" p="sm" radius="md" withBorder ref={ref} {...attributes}>
        <Text>{children}</Text>
      </Card>
    );
  },
);
