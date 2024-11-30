import { FC } from 'react';
import { getErrorTextWithEmpty } from '@api';
import { AlertGroup, useAlertGroup } from '@components/Alert';
import { useNotifications } from '@hooks';
import {
  PASSWORD_PUT_ERRORS,
  ProfileChangePasswordForm,
  useChangePasswordController,
} from '@modules/authorization';

export const ProfilePage: FC = () => {
  const controller = useChangePasswordController();
  const alertGroupController = useAlertGroup([
    {
      type: 'error',
      text: getErrorTextWithEmpty(controller.apiError?.type, {
        requestErrors: PASSWORD_PUT_ERRORS,
      }),
      on: !!controller.apiError,
    },
    {
      type: 'success',
      text: 'Пароль успешно изменен',
      on: controller.sender.isSuccess,
    },
  ]);
  useNotifications([
    {
      type: 'success',
      on: controller.sender.isSuccess,
      message: '123',
    },
  ]);

  return (
    <AlertGroup {...alertGroupController.attributes}>
      <ProfileChangePasswordForm controller={controller} />
    </AlertGroup>
  );
};
