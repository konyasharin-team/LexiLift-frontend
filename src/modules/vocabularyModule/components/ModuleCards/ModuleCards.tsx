import { IoTrashBinOutline } from 'react-icons/io5';
import { Flex, Paper, Text, TextInput } from '@mantine/core';
import { ImageUpload } from '@modules/vocabularyModule/components/ImageUpload/ImageUpload.tsx';
import { appColors } from '@themes';

import styles from './ModuleCards.module.css';

interface ICardProps {
  index: number;
  card: {
    word: string;
    translation: string;
    imageUploaded: boolean;
    imageUrl?: string;
  };
  onCardChange: (
    index: number,
    field: 'word' | 'translation',
    value: string,
  ) => void;
  onImageUpload: (index: number, imageUrl: string) => void;
  onDeleteImage: (index: number) => void;
  onRemoveCard: (index: number) => void;
  disableRemove?: boolean;
}

export const ModuleCards = ({
  index,
  card,
  onCardChange,
  onImageUpload,
  onDeleteImage,
  onRemoveCard,
  disableRemove,
}: ICardProps) => (
  <Paper shadow="md" radius="md" mt={20}>
    <div style={{ borderBottom: `2px solid ${appColors.greyApp[0]}` }}>
      <Flex justify="space-between">
        <Text ml={25} mt={10} mb={10}>
          {index + 1}
        </Text>
        <Flex align="center" gap={5} mr={18}>
          <ImageUpload
            cardIndex={index}
            imageUploaded={card.imageUploaded}
            imageUrl={card.imageUrl}
            onImageUpload={onImageUpload}
            onDeleteImage={onDeleteImage}
          />
          {!disableRemove && (
            <IoTrashBinOutline
              color="red"
              className={styles.icon}
              onClick={() => onRemoveCard(index)}
            />
          )}
        </Flex>
      </Flex>
    </div>
    <Flex justify="space-between" gap={20}>
      <TextInput
        placeholder="Слово"
        value={card.word}
        w="100%"
        mt={30}
        mb={30}
        ml={25}
        onChange={e => onCardChange(index, 'word', e.target.value)}
        className="text"
        style={{ borderBottom: `1px solid ${appColors.greyApp[3]}` }}
        variant="unstyled"
      />
      <TextInput
        placeholder="Перевод"
        value={card.translation}
        w="100%"
        mt={30}
        mb={30}
        mr={25}
        onChange={e => onCardChange(index, 'translation', e.target.value)}
        className="text"
        style={{ borderBottom: `1px solid ${appColors.greyApp[3]}` }}
        variant="unstyled"
      />
    </Flex>
  </Paper>
);
