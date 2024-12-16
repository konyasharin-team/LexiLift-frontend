import { FC } from 'react';
import { useI18N } from '@i18n';
import { Button, Flex, Paper, Textarea, TextInput } from '@mantine/core';
import { ModuleCard } from '@modules/vocabularyModule/components/ModuleCard/ModuleCard.tsx';
import TagsInput from '@modules/vocabularyModule/components/TagsInput/TagsInput.tsx';
import { useCreateModule } from '@modules/vocabularyModule/hooks/useCreateModule.ts';
import { useTags } from '@modules/vocabularyModule/hooks/useTags.ts';

import styles from './CreateModule.module.css';

export const CreateModule: FC<ReturnType<typeof useCreateModule>> = props => {
  const tagsController = useTags();
  const { t } = useI18N();

  return (
    <Flex justify="center" p={50} direction="column">
      <Flex justify="space-between" gap={20}>
        <Flex direction="column" w="50%">
          <Paper shadow="md">
            <TextInput
              placeholder={t.createModulePage.moduleName}
              className="text"
            />
          </Paper>

          <div>
            <Paper shadow="md">
              <TagsInput {...tagsController} />
            </Paper>
          </div>
        </Flex>
        <Paper shadow="md" w="50%">
          <Textarea
            placeholder={t.createModulePage.description}
            h="100%"
            className="text"
            classNames={{ wrapper: styles.wrapper, input: styles.input }}
          />
        </Paper>
      </Flex>

      {props.cards.map((card, index) => (
        <ModuleCard
          key={index}
          id={index}
          card={card}
          onCardChange={props.onCardChange}
          removeCard={props.removeCard}
          disableRemove={props.cards.length <= 3}
        />
      ))}

      <Button
        onClick={props.addCard}
        fullWidth
        variant="outline"
        mt={30}
        h={120}
        className="text"
      >
        {t.createModulePage.addCard}
      </Button>
    </Flex>
  );
};
