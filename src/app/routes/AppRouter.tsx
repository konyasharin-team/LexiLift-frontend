import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '@pages/NotFoundPage.tsx';

import { routesList } from './routesList.tsx';

export const AppRouter: FC = () => {
  return (
    <Routes>
      {routesList.map(route => (
        <Route path={route.path} element={route.element} />
      ))}
      <Route path={'/*'} element={<NotFoundPage />} />
    </Routes>
  );
};
