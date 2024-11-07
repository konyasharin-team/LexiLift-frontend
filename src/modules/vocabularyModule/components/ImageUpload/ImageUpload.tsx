import { useState } from 'react';
import { ImFilePicture } from 'react-icons/im';
import { Button, Flex, Image, Modal, Text } from '@mantine/core';
import { uploadImage } from '@utils';

import styles from './ImageUpload.module.css';

interface IImageUploadProps {
  cardIndex: number;
  imageUploaded: boolean;
  imageUrl?: string;
  onImageUpload: (index: number, imageUrl: string) => void;
  onDeleteImage: (index: number) => void;
}

export const ImageUpload = ({
  cardIndex,
  imageUploaded,
  imageUrl,
  onImageUpload,
  onDeleteImage,
}: IImageUploadProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = async () => {
    if (imageUploaded && imageUrl) {
      setIsChoiceModalOpen(true);
    } else {
      try {
        const newImageUrl = await uploadImage();
        if (newImageUrl) {
          onImageUpload(cardIndex, newImageUrl);
        }
      } catch (error) {
        console.error('Ошибка загрузки изображения', error);
      }
    }
  };

  const handleDeleteImage = () => {
    onDeleteImage(cardIndex);
    setIsChoiceModalOpen(false);
  };

  const handleViewImage = () => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setIsModalOpen(true);
      setIsChoiceModalOpen(false);
    }
  };

  return (
    <>
      <ImFilePicture
        color={imageUploaded ? 'green' : 'blue'}
        onClick={handleImageUpload}
        className={styles.icon}
      />

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Просмотр изображения"
      >
        {selectedImage && (
          <Image
            src={selectedImage}
            alt="Загруженное изображение"
            className={styles.uploadedImage}
          />
        )}
      </Modal>

      <Modal
        opened={isChoiceModalOpen}
        onClose={() => setIsChoiceModalOpen(false)}
        title="Изображение уже загружено"
      >
        <Text mb={20}>Что вы хотите сделать с изображением?</Text>
        <Flex justify="center" gap={5}>
          <Button color="red" onClick={handleDeleteImage}>
            Удалить изображение
          </Button>
          <Button color="blue" onClick={handleViewImage}>
            Просмотреть изображение
          </Button>
        </Flex>
      </Modal>
    </>
  );
};
