import { DependencyList, useEffect, useMemo, useState } from 'react';
import { AlertType, IAlertProps } from '@components/Alert';
import { useDependencies } from '@hooks';

interface IAlertGroupElementSetting {
  key: string;
  type: AlertType;
  on: boolean;
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
  const { dependencies } = useDependencies(
    alerts.map(alert => ({ ...alert, dependency: [alert.on] })),
    (element, externalElement) => element.on !== externalElement.on,
  );
  const memoAlerts = useMemo(
    () => alerts,
    options?.extraDependencies
      ? [...dependencies, ...options.extraDependencies]
      : dependencies,
  );
  const [activeAlert, setActiveAlert] =
    useState<IAlertGroupElementSetting | null>(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setActiveAlert(memoAlerts.find(alert => alert.on) ?? null);
  }, [memoAlerts]);

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
