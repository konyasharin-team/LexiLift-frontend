import { DictionaryCardSchemaInfer } from '@app-types';
import { useI18N } from '@i18n';
import { Flex, Paper, Text, TextInput } from '@mantine/core';
import { ImageUpload } from '@modules/vocabularyModule/components/ImageUpload/ImageUpload.tsx';
import { useEditModule } from '@modules/vocabularyModule/hooks/useEditModule.ts';
import { IEditModuleCardError } from '@modules/vocabularyModule/types/IEditModuleCardError.ts';
import { IconTrash } from '@tabler/icons-react';
import { appColors } from '@themes';

import styles from './ModuleCards.module.css';

interface IModuleCardProps
  extends Pick<
    ReturnType<typeof useEditModule>,
    'onCardChange' | 'removeCard'
  > {
  id: number;
  card: DictionaryCardSchemaInfer;
  errors?: Omit<IEditModuleCardError, 'id'>[];
  disableRemove?: boolean;
}

export const ModuleCard = (props: IModuleCardProps) => {
  const { t } = useI18N();

  return (
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
              onDeleteImage={() =>
                props.onCardChange(props.id, 'img', undefined)
              }
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
          placeholder={t.createModulePage.word}
          value={props.card.word}
          error={
            props.errors?.find(errorObj => errorObj.cardElement === 'word')
              ?.message ?? undefined
          }
          w="100%"
          mt={30}
          mb={30}
          ml={25}
          onChange={e =>
            props.onCardChange(props.id, 'word', e.currentTarget.value)
          }
          styles={{
            input: {
              border: 'none',
              borderRadius: 0,
              borderBottom: `1px solid ${appColors.greyApp[3]}`,
            },
          }}
          className={'text'}
          variant="unstyled"
        />
        <TextInput
          placeholder={t.createModulePage.translation}
          value={props.card.translation}
          error={
            props.errors?.find(
              errorObj => errorObj.cardElement === 'translation',
            )?.message ?? undefined
          }
          w="100%"
          mt={30}
          mb={30}
          mr={25}
          onChange={e =>
            props.onCardChange(props.id, 'translation', e.currentTarget.value)
          }
          styles={{
            input: {
              border: 'none',
              borderRadius: 0,
              borderBottom: `1px solid ${appColors.greyApp[3]}`,
            },
          }}
          className={'text'}
          variant="unstyled"
        />
      </Flex>
    </Paper>
  );
};
