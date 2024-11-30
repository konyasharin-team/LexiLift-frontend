import { DependencyList } from 'react';
import { NotificationType } from '@app-types';
import { IOnSettings, useOn } from '@hooks/useOn.ts';
import { NotificationData, showNotification } from '@mantine/notifications';
import { getNotificationColor } from '@utils';

interface INotificationSettings
  extends IOnSettings,
    Omit<NotificationData, 'key'> {
  type: NotificationType;
}

export const useNotifications = (
  notificationsSettings: (INotificationSettings & NotificationData)[],
  extraDependencies?: DependencyList,
) => {
  useOn(
    notificationsSettings,
    settings => {
      settings.forEach(setting => {
        if (setting.on)
          showNotification({
            color: getNotificationColor(setting.type),
            ...setting,
          });
      });
    },
    extraDependencies,
  );
};
