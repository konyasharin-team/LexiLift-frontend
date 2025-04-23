import { FC, useState } from 'react';
import { getErrorTextWithEmpty } from '@api';
import { AlertGroup, useAlertGroup } from '@components/Alert';
import { DeleteConfirmationModal } from '@components/DeleteConfirmationModal/DeleteConfirmationModal.tsx';
import { useI18N } from '@i18n';
import { Button } from '@mantine/core';
import {
  PASSWORD_PUT_ERRORS,
  ProfileChangeLanguageForm,
  ProfileChangePasswordForm,
  useChangePasswordController,
} from '@modules/authorization';
import { useDeleteAccount } from '@modules/authorization';

export const ProfilePage: FC = () => {
  const { t } = useI18N();
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const controller = useChangePasswordController();
  const deleteAccountController = useDeleteAccount();
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
    {
      type: 'error',
      text: getErrorTextWithEmpty(deleteAccountController.apiError?.type),
      on: !!deleteAccountController.apiError,
    },
  ]);

  const handleDeleteAccount = () => {
    deleteAccountController.sender.mutate();
    setDeleteModalOpened(false);
  };

  return (
    <AlertGroup {...alertGroupController.attributes}>
      <ProfileChangePasswordForm controller={controller} />
      <ProfileChangeLanguageForm />
      <Button
        color="red"
        mt="sm"
        w="100%"
        onClick={() => setDeleteModalOpened(true)}
      >
        {t.profilePage.deleteAccount}
      </Button>
      <DeleteConfirmationModal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        onConfirm={handleDeleteAccount}
      />
    </AlertGroup>
  );
};
