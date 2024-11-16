import { FC } from 'react';
import { AppLayout } from '@components/AppLayout';
import { AppRouter } from '@routes';

const App: FC = () => {
  return (
    <AppLayout>
      <AppRouter />
    </AppLayout>
  );
};

export default App;
