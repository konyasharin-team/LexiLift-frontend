import { TEST_WORDS_PER_ROUND } from '@constants/test';
import { UseFormReturnType } from '@mantine/form';
import { ITestSettings } from '@modules/sharedTest';

export const checkWordsPerRoundSetting = (
  settings: Pick<ITestSettings, 'wordsPerRound' | 'wordsCount'>,
  form: UseFormReturnType<Pick<ITestSettings, 'wordsPerRound' | 'wordsCount'>>,
) => {
  if (
    settings.wordsCount <= TEST_WORDS_PER_ROUND ||
    settings.wordsCount < settings.wordsPerRound
  )
    form.setFieldValue('wordsPerRound', settings.wordsCount);
};
