import { useEffect, useState } from 'react';
import { ImagePreviewModal } from '@components/ImagePreviewModal';
import { IconPhoto } from '@tabler/icons-react';
import { uploadFile } from '@utils';

import styles from './ImageUpload.module.css';

interface IImageUploadProps {
  imageUrl?: string;
  onImageUpload: (imageUrl: string) => void;
  onDeleteImage: () => void;
}

export const ImageUpload = (props: IImageUploadProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadImage = async () => {
    try {
      const newImageUrl = await uploadFile('image/*', 2);
      if (newImageUrl) {
        props.onImageUpload(newImageUrl);
      }
    } catch (error) {
      console.error('Ошибка загрузки изображения', error);
    }
  };

  const handleDeleteImage = () => {
    props.onDeleteImage();
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (props.imageUrl) setIsModalOpen(true);
  }, [props.imageUrl]);

  return (
    <>
      <IconPhoto
        color={props.imageUrl ? 'green' : 'blue'}
        onClick={() => {
          if (props.imageUrl) {
            setIsModalOpen(true);
          } else {
            handleUploadImage();
          }
        }}
        className={styles.icon}
      />
      {props.imageUrl ? (
        <ImagePreviewModal
          img={props.imageUrl}
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
