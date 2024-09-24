import { FC, MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { ActionIcon } from '@mantine/core';

interface ICardSideHeadButton {
  onClick?: (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: ReactNode;
}

export const CardSideHeadButton: FC<ICardSideHeadButton> = props => {
  return (
    <ActionIcon
      color={'dark'}
      variant={'subtle'}
      p={4}
      w={'fit-content'}
      h={'fit-content'}
      onClick={e => {
        e.stopPropagation();
        props.onClick?.(e);
      }}
    >
      {props.children}
    </ActionIcon>
  );
};
