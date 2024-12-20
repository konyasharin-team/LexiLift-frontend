import { FC } from 'react';
import { useInitPage } from '@hooks';
import { AppError, AppLayout, AppLoader } from '@modules/layout';
import { AppRouter } from '@routes';

const App: FC = () => {
  useInitPage();
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
