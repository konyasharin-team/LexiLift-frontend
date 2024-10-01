import * as React from 'react';
import { Card, Text } from '@mantine/core';

interface TestCardProps {
  value: string;
  type: 'word' | 'translation';
  isDragging: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  isShaking: boolean;
  onDragStart: () => void;
  onDrop: () => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent) => void;
}

export const DraggableCard = ({
  value,
  isDragging,
  isCorrect,
  isWrong,
  isShaking,
  onDragStart,
  onDrop,
  onDragEnd,
  onDragOver,
}: TestCardProps) => {
  return (
    <Card
      shadow="sm"
      p="sm"
      radius="md"
      withBorder
      draggable
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      className={isShaking ? 'shake' : ''}
      style={{
        cursor: 'grab',
        opacity: isDragging ? 0 : 1,
        transition: 'opacity 0.3s ease, background-color 0.5s ease',
        backgroundColor: isCorrect ? '#4caf50' : isWrong ? '#f44336' : 'white',
      }}
    >
      <Text>{value}</Text>
    </Card>
  );
};
