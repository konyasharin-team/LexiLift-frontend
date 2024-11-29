import { FC } from 'react';
import { Paper } from '@mantine/core';
import {
  ProfileChangePasswordForm,
  useChangePasswordController,
} from '@modules/authorization';

export const ProfilePage: FC = () => {
  const controller = useChangePasswordController();
  return (
    <Paper shadow="xs" p="xl">
      <ProfileChangePasswordForm controller={controller} />
    </Paper>
  );
};
