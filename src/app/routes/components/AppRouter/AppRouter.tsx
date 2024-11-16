import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '@pages/NotFoundPage.tsx';
import { RouteWrapper } from '@routes/components/Route/RouteWrapper.tsx';
import { useAppSelector } from '@store/hooks';

import { privateRoutes, publicRoutes, routes } from '../../routes.tsx';

export const AppRouter: FC = () => {
  const { user } = useAppSelector(state => state.auth);
  return (
    <Routes>
      {routes.map(route => (
        <Route
          path={route.path}
          element={<RouteWrapper>{route.element}</RouteWrapper>}
          key={route.path}
        />
      ))}
      {publicRoutes.map(route => {
        if (!user)
          return (
            <Route
              path={route.path}
              element={<RouteWrapper>{route.element}</RouteWrapper>}
              key={route.path}
            />
          );
      })}
      {privateRoutes.map(route => {
        if (user && route.availableFor.includes(user.role))
          return (
            <Route
              path={route.path}
              element={
                <RouteWrapper withLayout={route.withLayout}>
                  {route.element}
                </RouteWrapper>
              }
              key={route.path}
            />
          );
      })}
      <Route
        path={'/*'}
        element={
          <RouteWrapper>
            <NotFoundPage />
          </RouteWrapper>
        }
      />
    </Routes>
  );
};
