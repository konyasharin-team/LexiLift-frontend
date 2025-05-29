import { NotificationType } from '@app-types';
import { NotificationData, showNotification } from '@mantine/notifications';
import { getNotificationColor } from '@utils/getNotificationColor.ts';

export interface INotificationSettings
  extends Pick<NotificationData, 'message'> {
  type: NotificationType;
}

export const notify = (settings: INotificationSettings) => {
  showNotification({
    ...settings,
    color: getNotificationColor(settings.type),
  });
};
