import { DictionaryCardSchemaInfer } from '@app-types';
import { useForm } from '@mantine/form';
import { ModuleSchemaInfer } from '@modules/vocabularyModule/types/ModuleSchema.ts';

export const useEditModule = () => {
  const form = useForm<
    Pick<ModuleSchemaInfer, 'tags' | 'title' | 'description' | 'cards'>
  >({
    initialValues: {
      tags: [],
      title: '',
      description: '',
      cards: [
        { id: 0, word: '', translation: '' },
        { id: 1, word: '', translation: '' },
        { id: 2, word: '', translation: '' },
      ],
    },
  });

  const onCardChange = <T extends keyof Omit<DictionaryCardSchemaInfer, 'id'>>(
    id: DictionaryCardSchemaInfer['id'],
    field: T,
    value: DictionaryCardSchemaInfer[T],
  ) => {
    form.setValues(values => {
      return {
        ...values,
        cards: values.cards?.map(card => {
          if (card.id === id) return { ...card, [field]: value };
          return card;
        }),
      };
    });
  };

  const addCard = () => {
    form.setValues(values => {
      return {
        ...values,
        cards: [
          ...(values.cards ?? []),
          {
            id: values.cards ? values.cards.length - 1 : 0,
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
        cards: values.cards?.filter(card => card.id !== id),
      };
    });
  };

  return {
    form,
    onCardChange,
    addCard,
    removeCard,
  };
};
