import { NotificationType } from '@app-types';
import { MantineColor } from '@mantine/core';

export const getNotificationColor = (
  alertType: NotificationType,
): MantineColor => {
  switch (alertType) {
    case 'success':
      return 'green';
    case 'warning':
      return 'orange';
    case 'error':
      return 'red';
    case 'info':
      return 'blue';
  }
};
