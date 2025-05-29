import { useNavigate } from 'react-router-dom';
import { useForm, UseFormReturnType } from '@mantine/form';
import { ITestSettings } from '@modules/sharedTest';
import { appPaths } from '@routes';

interface IUseTestSettingsFormOptions<
  TSettings extends Partial<ITestSettings>,
> {
  initialValues?: TSettings;
  onValuesChange?: ((
    settings: TSettings,
    form: UseFormReturnType<TSettings>,
  ) => boolean)[];
}

export const useTestSettingsForm = <TSettings extends Partial<ITestSettings>>(
  setSettingsAction: (settings: TSettings) => void,
  options?: IUseTestSettingsFormOptions<TSettings>,
) => {
  const form = useForm<TSettings>({
    initialValues: options?.initialValues,
    onValuesChange: values => {
      options?.onValuesChange?.forEach(onChangeFn => onChangeFn(values, form));
    },
  });
  const navigate = useNavigate();

  const save = (settings: TSettings) => {
    setSettingsAction(settings);
    navigate(appPaths.MATCH_TEST);
  };

  return {
    form,
    save,
  };
};
