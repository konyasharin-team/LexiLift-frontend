import { DependencyList, useEffect, useState } from 'react';
import { NotificationType } from '@app-types';
import { IAlertProps } from '@components/Alert';
import { IOnSettings, useOn } from '@hooks';
import { generateKeys } from '@utils';

interface IAlertGroupElementSetting extends Omit<IOnSettings, 'key'> {
  type: NotificationType;
  text: string;
}

interface IUserAlertGroupReturn {
  attributes: IAlertProps;
}

interface IUserAlertGroupOptions {
  extraDependencies?: DependencyList;
  attributes?: Partial<IAlertProps>;
}

export const useAlertGroup = (
  alerts: IAlertGroupElementSetting[],
  options?: IUserAlertGroupOptions,
): IUserAlertGroupReturn => {
  useOn(
    generateKeys(alerts),
    settings => {
      setActiveAlert(settings.find(alert => alert.on) ?? null);
    },
    options?.extraDependencies,
  );
  const [activeAlert, setActiveAlert] =
    useState<IAlertGroupElementSetting | null>(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setOpened(activeAlert !== null);
  }, [activeAlert]);

  return {
    attributes: {
      type: activeAlert?.type ?? 'error',
      durationOpen: 0.1,
      durationClose: 0.1,
      text: activeAlert?.text,
      opened,
      setOpened,
      ...options?.attributes,
    },
  };
};
