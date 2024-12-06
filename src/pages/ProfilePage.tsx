import { FC } from 'react';
import { getErrorTextWithEmpty } from '@api';
import { AlertGroup, useAlertGroup } from '@components/Alert';
import { useI18N } from '@i18n';
import {
  PASSWORD_PUT_ERRORS,
  ProfileChangeLanguageForm,
  ProfileChangePasswordForm,
  useChangePasswordController,
} from '@modules/authorization';

export const ProfilePage: FC = () => {
  const { t } = useI18N();
  const controller = useChangePasswordController();
  const alertGroupController = useAlertGroup([
    {
      type: 'error',
      text: getErrorTextWithEmpty(controller.apiError?.type, {
        requestErrors: PASSWORD_PUT_ERRORS(t),
      }),
      on: !!controller.apiError,
    },
    {
      type: 'success',
      text: t.profilePage.successfulChangingPassword,
      on: controller.sender.isSuccess,
    },
  ]);

  return (
    <AlertGroup {...alertGroupController.attributes}>
      <ProfileChangePasswordForm controller={controller} />
      <ProfileChangeLanguageForm />
    </AlertGroup>
  );
};
