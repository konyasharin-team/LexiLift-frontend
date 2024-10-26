import { FC } from 'react';
import { IModal } from '@components/Modal/types/IModal.ts';
import { Modal as MantineModal } from '@mantine/core';

export const Modal: FC<IModal> = props => {
  return (
    <MantineModal
      opened={props.isOpen}
      title={props.title}
      onClose={() => props.setIsOpen(false)}
      centered={true}
      fw={500}
      fz={32}
    >
      {props.children}
    </MantineModal>
  );
};
