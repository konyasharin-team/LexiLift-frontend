import { FC } from 'react';
import { Form } from '@components/Form';
import { MODULE_MIN_COUNT_WORDS, TEST_WORDS_PER_ROUND } from '@constants';
import { Button, Flex, NumberInput } from '@mantine/core';
import { MatchTestSettings } from '@modules/matchTest';
import { useTestSettingsForm } from '@modules/sharedTest';

interface IMatchTestSettingsPanelProps
  extends ReturnType<typeof useTestSettingsForm<MatchTestSettings>> {
  maxWordsCount?: number;
}

export const MatchTestSettingsPanel: FC<
  IMatchTestSettingsPanelProps
> = props => {
  return (
    <Form title={'Настройки теста'} onSubmit={props.form.onSubmit(props.save)}>
      <Flex direction={'column'} gap={10}>
        <NumberInput
          label={'Количество слов'}
          min={MODULE_MIN_COUNT_WORDS}
          max={props.maxWordsCount}
          {...props.form.getInputProps('wordsCount')}
        />
        <NumberInput
          label={'Количество слов в раунде'}
          min={
            props.form.getValues().wordsCount > TEST_WORDS_PER_ROUND
              ? TEST_WORDS_PER_ROUND
              : props.form.getValues().wordsCount
          }
          max={props.form.getValues().wordsCount}
          {...props.form.getInputProps('wordsPerRound')}
        />
      </Flex>
      <Button fullWidth={true} mt={15} type={'submit'}>
        Перейти к тесту
      </Button>
    </Form>
  );
};
