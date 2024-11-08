import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IModal, Modal } from '@components/Modal';
import { Button, Text } from '@mantine/core';
import { appPaths } from '@routes';

interface IMatchTestStartModalProps extends IModal {
  start: () => void;
}

export const MatchTestStartModal: FC<IMatchTestStartModalProps> = props => {
  const navigate = useNavigate();

  return (
    <Modal onClose={() => navigate(appPaths.MATCH_TEST_SETTINGS)} {...props}>
      <Text>Тут описание теста</Text>
      <Button
        mt={20}
        fullWidth={true}
        onClick={() => {
          props.start();
          props.setIsOpen(false);
        }}
      >
        Начать тест
      </Button>
    </Modal>
  );
};
