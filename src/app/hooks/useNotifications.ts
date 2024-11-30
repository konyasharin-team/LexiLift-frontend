import { DependencyList } from 'react';
import { NotificationType } from '@app-types';
import { IOnSettings, useOn } from '@hooks/useOn.ts';
import { NotificationData, showNotification } from '@mantine/notifications';
import { generateKeys, getNotificationColor } from '@utils';

interface INotificationSettings
  extends Omit<IOnSettings, 'key'>,
    Pick<NotificationData, 'message'> {
  type: NotificationType;
}

export const useNotifications = (
  notificationsSettings: INotificationSettings[],
  extraDependencies?: DependencyList,
) => {
  useOn(
    generateKeys(notificationsSettings),
    settings => {
      settings.forEach(setting => {
        if (setting.on)
          showNotification({
            color: getNotificationColor(setting.type),
            message: setting.message,
          });
      });
    },
    extraDependencies,
  );
};
