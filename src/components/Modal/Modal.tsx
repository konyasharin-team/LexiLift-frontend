import { FC } from 'react';
import { IModal } from '@components/Modal/types/IModal.ts';
import { Modal as MantineModal } from '@mantine/core';

interface IModalProps extends Omit<IModal, 'setIsOpen'> {
  onClose: () => void;
}

export const Modal: FC<IModalProps> = props => {
  return (
    <MantineModal
      opened={props.isOpen}
      title={props.title}
      onClose={props.onClose}
      centered={true}
      fw={500}
      fz={32}
    >
      {props.children}
    </MantineModal>
  );
};
