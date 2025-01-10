import { ArrayElement, DictionaryCardSchemaInfer } from '@app-types';
import { useForm } from '@mantine/form';
import { useEditModuleErrors } from '@modules/vocabularyModule/hooks/useEditModuleErrors.ts';
import { ModuleSchemaInfer } from '@modules/vocabularyModule/types/ModuleSchema.ts';

export type Form = Pick<
  ModuleSchemaInfer,
  'tags' | 'title' | 'description' | 'words'
>;

export const useEditModule = () => {
  const form = useForm<Form>({
    initialValues: {
      tags: [],
      title: '',
      description: '',
      words: [
        { id: 0, word: '', translation: '' },
        { id: 1, word: '', translation: '' },
        { id: 2, word: '', translation: '' },
      ],
    },
  });
  const { validateCards, cardsErrors } = useEditModuleErrors();

  const onCardChange = <T extends keyof Omit<DictionaryCardSchemaInfer, 'id'>>(
    id: DictionaryCardSchemaInfer['id'],
    field: T,
    value: DictionaryCardSchemaInfer[T],
  ) => {
    const newCards = form.values.words.map(card => {
      if (card.id === id) return { ...card, [field]: value };
      return card;
    });
    form.setValues(values => {
      return {
        ...values,
        words: newCards,
      };
    });
    validateCards(newCards);
  };

  const addCard = () => {
    form.setValues(values => {
      return {
        ...values,
        words: [
          ...(values.words ?? []),
          {
            id: values.words ? values.words[values.words.length - 1].id + 1 : 0,
            word: '',
            translation: '',
          },
        ],
      };
    });
  };

  const removeCard = (id: DictionaryCardSchemaInfer['id']) => {
    form.setValues(values => {
      return {
        ...values,
        words: values.words?.filter(card => card.id !== id),
      };
    });
  };

  const addTag = (tag: ArrayElement<ModuleSchemaInfer['tags']>) => {
    form.setValues(values => {
      return {
        ...values,
        tags: [...form.values.tags, tag],
      };
    });
  };

  const removeTag = (tag: string) => {
    form.setValues(values => {
      return {
        ...values,
        tags: form.values.tags.filter(tagObj => tagObj.tag !== tag),
      };
    });
  };

  return {
    form,
    onCardChange,
    addCard,
    removeCard,
    addTag,
    removeTag,
    cardsErrors,
  };
};
