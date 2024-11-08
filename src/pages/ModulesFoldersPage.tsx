import { FC } from 'react';
import { AppLayout } from '@components/AppLayout/AppLayout.tsx';
import { Folders } from '@modules/modulesFolders/components/Folders/Folders.tsx';

export const ModulesFoldersPage: FC = () => {
  return (
    <AppLayout>
      <Folders />
    </AppLayout>
  );
};
