import { IDictionaryCard } from '@app-types';
import { Flex, Paper, Text, TextInput } from '@mantine/core';
import { ImageUpload } from '@modules/vocabularyModule/components/ImageUpload/ImageUpload.tsx';
import { useCreateModule } from '@modules/vocabularyModule/hooks/useCreateModule.ts';
import { IconTrash } from '@tabler/icons-react';
import { appColors } from '@themes';

import styles from './ModuleCards.module.css';

interface IModuleCardProps
  extends Pick<
    ReturnType<typeof useCreateModule>,
    'onCardChange' | 'removeCard'
  > {
  id: number;
  card: IDictionaryCard;
  disableRemove?: boolean;
}

export const ModuleCard = (props: IModuleCardProps) => (
  <Paper shadow="md" radius="md" mt={20}>
    <div style={{ borderBottom: `2px solid ${appColors.greyApp[0]}` }}>
      <Flex justify="space-between">
        <Text ml={25} mt={10} mb={10}>
          {props.id + 1}
        </Text>
        <Flex align="center" gap={5} mr={18}>
          <ImageUpload
            imageUrl={props.card.img}
            onImageUpload={imageUrl =>
              props.onCardChange(props.id, 'img', imageUrl)
            }
            onDeleteImage={() => props.onCardChange(props.id, 'img', undefined)}
          />
          {!props.disableRemove && (
            <IconTrash
              color="red"
              className={styles.icon}
              onClick={() => props.removeCard(props.id)}
            />
          )}
        </Flex>
      </Flex>
    </div>
    <Flex justify="space-between" gap={20}>
      <TextInput
        placeholder="Слово"
        value={props.card.word}
        w="100%"
        mt={30}
        mb={30}
        ml={25}
        onChange={e => props.onCardChange(props.id, 'word', e.target.value)}
        className="text"
        style={{ borderBottom: `1px solid ${appColors.greyApp[3]}` }}
        variant="unstyled"
      />
      <TextInput
        placeholder="Перевод"
        value={props.card.translation}
        w="100%"
        mt={30}
        mb={30}
        mr={25}
        onChange={e =>
          props.onCardChange(props.id, 'translation', e.target.value)
        }
        className="text"
        style={{ borderBottom: `1px solid ${appColors.greyApp[3]}` }}
        variant="unstyled"
      />
    </Flex>
  </Paper>
);
