import { FC } from 'react';
import { IModal, Modal } from '@components/Modal';
import { Button, Text } from '@mantine/core';

interface IMatchTestStartModalProps extends IModal {
  start: () => void;
}

export const MatchTestStartModal: FC<IMatchTestStartModalProps> = props => {
  return (
    <Modal {...props}>
      <Text>Тут описание теста</Text>
      <Button
        onClick={() => {
          props.start();
          props.setIsOpen(false);
        }}
      >Начать тест</Button>
    </Modal>
  );
};
