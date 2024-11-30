import { FC } from 'react';
import { useWhoAmIController } from '@modules/authorization';
import { AppError, AppLayout, AppLoader } from '@modules/layout';
import { AppRouter } from '@routes';

const App: FC = () => {
  useWhoAmIController();
  return (
    <AppError>
      <AppLoader>
        <AppLayout>
          <AppRouter />
        </AppLayout>
      </AppLoader>
    </AppError>
  );
};

export default App;
