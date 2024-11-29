import { useState } from 'react';
import { ImagePreviewModal } from '@components/ImagePreviewModal';
import { IconPhoto } from '@tabler/icons-react';
import { uploadFile } from '@utils';

import styles from './ImageUpload.module.css';

interface IImageUploadProps {
  cardIndex: number;
  imageUrl?: string;
  onImageUpload: (index: number, imageUrl: string) => void;
  onDeleteImage: (index: number) => void;
}

export const ImageUpload = ({
  cardIndex,
  imageUrl,
  onImageUpload,
  onDeleteImage,
}: IImageUploadProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadImage = async () => {
    try {
      const newImageUrl = await uploadFile('image/*');
      if (newImageUrl) {
        onImageUpload(cardIndex, newImageUrl);
      }
    } catch (error) {
      console.error('Ошибка загрузки изображения', error);
    }
  };

  const handleDeleteImage = () => {
    onDeleteImage(cardIndex);
    setIsModalOpen(false);
  };

  return (
    <>
      <IconPhoto
        color={imageUrl ? 'green' : 'blue'}
        onClick={() => {
          if (imageUrl) {
            setIsModalOpen(true);
          } else {
            handleUploadImage();
          }
        }}
        className={styles.icon}
      />
      {imageUrl ? (
        <ImagePreviewModal
          img={imageUrl}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onChange={handleUploadImage}
          onDelete={handleDeleteImage}
          resolution={{
            x: 400,
            y: 400,
          }}
        />
      ) : undefined}
    </>
  );
};
