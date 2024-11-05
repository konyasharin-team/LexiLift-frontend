import AppLayout from '@components/AppLayout/AppLayout.tsx';
import { Affix, Button, Flex, Paper, Textarea, TextInput } from '@mantine/core';
import { ModuleCards } from '@modules/vocabularyModule/components/ModuleCards/ModuleCards.tsx';
import TagsInput from '@modules/vocabularyModule/components/TagsInput/TagsInput.tsx';
import { useModuleCard } from '@modules/vocabularyModule/hooks/useModuleCard';

import { useTags } from '../../hooks/useTags.ts';

import styles from './CreateModule.module.css';

export const CreateModule = () => {
  const tagsController = useTags();

  const moduleCardsController = useModuleCard();

  const handleAddCard = () => {
    moduleCardsController.setCards([
      ...moduleCardsController.cards,
      { word: '', translation: '', imageUploaded: false },
    ]);
  };

  const handleRemoveCard = (index: number) => {
    if (moduleCardsController.cards.length > 3) {
      const newCards = moduleCardsController.cards.filter(
        (_, i) => i !== index,
      );
      moduleCardsController.setCards(newCards);
    }
  };

  return (
    <AppLayout>
      <Flex justify="center" p={50} direction="column">
        <Flex justify="space-between" gap={20}>
          <Flex direction="column" w="50%">
            <Paper shadow="md">
              <TextInput placeholder="Название модуля" className="text" />
            </Paper>

            <div>
              <Paper shadow="md">
                <TagsInput {...tagsController} />
              </Paper>
            </div>
          </Flex>
          <Paper shadow="md" w="50%">
            <Textarea
              placeholder="Описание"
              h="100%"
              className="text"
              classNames={{ wrapper: styles.wrapper, input: styles.input }}
            />
          </Paper>
        </Flex>

        {moduleCardsController.cards.map((card, index) => (
          <ModuleCards
            key={index}
            index={index}
            card={card}
            onCardChange={moduleCardsController.handleCardChange}
            onImageUpload={moduleCardsController.handleImageUpload}
            onDeleteImage={moduleCardsController.handleDeleteImage}
            onRemoveCard={handleRemoveCard}
            disableRemove={moduleCardsController.cards.length <= 3}
          />
        ))}

        <Button
          onClick={handleAddCard}
          fullWidth
          variant="outline"
          mt={30}
          h={120}
          className="text"
        >
          Добавить карточку
        </Button>

        <Affix position={{ bottom: 20, right: 20 }}>
          <Button radius="md" size="xl" color="blue">
            Создать модуль
          </Button>
        </Affix>
      </Flex>
    </AppLayout>
  );
};
