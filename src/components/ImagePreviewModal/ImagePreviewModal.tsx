import { FC } from 'react';
import { IModal, Modal } from '@components/Modal';
import { Button, Flex, Image } from '@mantine/core';

interface IImagePreviewModalProps extends IModal {
  img: string;
  resolution: {
    x: number;
    y: number;
  };
  onChange?: () => void;
  onDelete?: () => void;
}

export const ImagePreviewModal: FC<IImagePreviewModalProps> = ({
  setIsOpen,
  img,
  resolution,
  onDelete,
  onChange,
  ...attributes
}) => {
  return (
    <Modal onClose={() => setIsOpen(false)} {...attributes}>
      <Image
        src={img}
        h={resolution.y}
        w={resolution.x}
        alt="Загруженное изображение"
      />
      <Flex gap={5} justify={'space-between'} mt={10}>
        {onChange ? (
          <Button onClick={onChange}>Изменить изображение</Button>
        ) : undefined}
        {onDelete ? (
          <Button color={'red'} onClick={onDelete}>
            Удалить изображение
          </Button>
        ) : undefined}
      </Flex>
    </Modal>
  );
};
