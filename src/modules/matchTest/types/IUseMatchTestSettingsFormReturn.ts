import { ITestSettings } from '@app-types';
import { UseFormReturnType } from '@mantine/form';

export interface IUseMatchTestSettingsFormReturn {
  form: UseFormReturnType<ITestSettings>;
  save: (settings: ITestSettings) => void;
}
