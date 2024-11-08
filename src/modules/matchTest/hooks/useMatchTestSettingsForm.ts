import { ITestSettings } from '@app-types';
import { TEST_WORDS_PER_ROUND } from '@constants';
import { useForm } from '@mantine/form';
import { IUseMatchTestSettingsFormReturn } from '@modules/matchTest';
import { useActions } from '@store';
import { useNavigate } from 'react-router-dom';
import { appPaths } from '@routes';

export const useMatchTestSettingsForm = (
  initialSettings: ITestSettings,
): IUseMatchTestSettingsFormReturn => {
  const form = useForm<ITestSettings>({
    initialValues: initialSettings,
    onValuesChange: values => {
      if (
        values.wordsCount <= TEST_WORDS_PER_ROUND ||
        values.wordsCount < values.wordsPerRound
      )
        form.setFieldValue('wordsPerRound', values.wordsCount);
    },
  });
  const { setMatchTestSettings } = useActions();
  const navigate = useNavigate();

  const save = (settings: ITestSettings) => {
    setMatchTestSettings(settings);
    navigate(appPaths.MATCH_TEST);
  };

  return {
    form,
    save,
  };
};
