import { AlertType } from '@components/Alert';
import { MantineColor } from '@mantine/core';

export const getColor = (alertType: AlertType): MantineColor => {
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
