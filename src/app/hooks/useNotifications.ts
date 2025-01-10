import { DependencyList } from 'react';
import { IOnSettings, useOn } from '@hooks';
import { generateKeys, INotificationSettings, notify } from '@utils';

export const useNotifications = (
  notificationsSettings: (INotificationSettings & Omit<IOnSettings, 'key'>)[],
  extraDependencies?: DependencyList,
) => {
  useOn(
    generateKeys(notificationsSettings),
    settings => {
      settings.forEach(setting => {
        if (setting.on) notify(setting);
      });
    },
    extraDependencies,
  );
};
