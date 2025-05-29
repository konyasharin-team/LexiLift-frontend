import { DictionaryItemSchemaInfer } from '@app-types';
import { UseFormReturnType } from '@mantine/form';
import { createLearnTestBaseSettings } from '@modules/learnTest';
import { createMatchTestBaseSettings } from '@modules/matchTest';
import {
  checkWordsPerRoundSetting,
  ITestSettings,
  TestType,
} from '@modules/sharedTest';
import { ModuleSchemaInfer } from '@modules/vocabularyModule';
import { useActions } from '@store';

interface IUseTestSettingsBuilderReturn {
  setModuleAction: (module: ModuleSchemaInfer | null) => void;
  setSettingsAction: (settings: Partial<ITestSettings>) => void;
  createSettings: (
    module: DictionaryItemSchemaInfer[],
  ) => Partial<ITestSettings>;
  onValuesChange: (
    settings: Partial<ITestSettings>,
    form: UseFormReturnType<ITestSettings>,
  ) => void;
}

export const useTestSettingsBuilder = (
  testType: TestType,
): IUseTestSettingsBuilderReturn => {
  const {
    setMatchTestModule,
    setMatchTestSettings,
    setLearnTestSettings,
    setLearnTestModule,
  } = useActions();

  switch (testType) {
    case 'match':
      return {
        setModuleAction: setMatchTestModule,
        setSettingsAction: setMatchTestSettings,
        createSettings: (module: DictionaryItemSchemaInfer[]) =>
          createMatchTestBaseSettings(module),
        onValuesChange: [checkWordsPerRoundSetting],
      };
    case 'learn':
      return {
        setModuleAction: setLearnTestModule,
        setSettingsAction: setLearnTestSettings,
        createSettings: (module: DictionaryItemSchemaInfer[]) =>
          createLearnTestBaseSettings(module),
        onValuesChange: [],
      };
  }
};
