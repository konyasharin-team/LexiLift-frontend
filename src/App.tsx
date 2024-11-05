import { FC } from 'react';

import { AppRouter } from './app/routes';

import './app/styles/app.css';

const App: FC = () => {
  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;
