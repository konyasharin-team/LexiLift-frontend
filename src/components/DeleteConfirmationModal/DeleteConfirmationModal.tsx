import { FC } from 'react';
import { useI18N } from '@i18n';
import { Button, Modal, Stack, Text } from '@mantine/core';

interface IDeleteConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  text?: string;
  confirmText?: string;
  cancelText?: string;
}

export const DeleteConfirmationModal: FC<IDeleteConfirmationModalProps> = ({
  opened,
  onClose,
  onConfirm,
  title,
  text,
  confirmText,
  cancelText,
}) => {
  const { t } = useI18N();
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title || t.deleteConfirmationModal.title}
      withCloseButton={false}
      size={700}
      centered
      radius="md"
      styles={{
        title: {
          textAlign: 'center',
          width: '100%',
          fontWeight: 600,
          fontSize: '1.2rem',
        },
      }}
    >
      <Stack align="center" gap={5}>
        <Text mb="sm">{text || t.deleteConfirmationModal.defaultText}</Text>
        <Button w={350} color="red" onClick={onConfirm} mb="sm">
          {confirmText || t.deleteConfirmationModal.confirm}
        </Button>
        <Button w={350} variant="outline" onClick={onClose}>
          {cancelText || t.deleteConfirmationModal.cancel}
        </Button>
      </Stack>
    </Modal>
  );
};
