import { FC } from 'react';
import { AppLayout } from '@components/AppLayout';
import { AppLoader } from '@components/AppLoader';
import { useWhoAmIController } from '@modules/authorization';
import { AppRouter } from '@routes';

const App: FC = () => {
  const controller = useWhoAmIController();
  return (
    <AppLoader isLoading={controller.sender.isLoading}>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </AppLoader>
  );
};

export default App;
