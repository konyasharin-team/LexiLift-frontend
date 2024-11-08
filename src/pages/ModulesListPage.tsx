import { FC } from 'react';
import { AppLayout } from '@components/AppLayout/AppLayout.tsx';
import { ModulesList } from '@modules/modulesList/components/ModulesList/ModulesList.tsx';

export const ModulesListPage: FC = () => {
  return (
    <AppLayout>
      <ModulesList />
    </AppLayout>
  );
};
