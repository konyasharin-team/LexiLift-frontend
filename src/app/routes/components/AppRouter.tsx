import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '@pages/NotFoundPage.tsx';
import { useAppSelector } from '@store/hooks';

import { privateRoutes, publicRoutes, routes } from '../routes.tsx';

export const AppRouter: FC = () => {
  const { user } = useAppSelector(state => state.auth);
  return (
    <Routes>
      {routes.map(route => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
      {publicRoutes.map(route => {
        if (!user)
          return (
            <Route path={route.path} element={route.element} key={route.path} />
          );
      })}
      {privateRoutes.map(route => {
        if (user && route.availableFor.includes(user.role))
          return (
            <Route path={route.path} element={route.element} key={route.path} />
          );
      })}
      <Route path={'/*'} element={<NotFoundPage />} />
    </Routes>
  );
};
