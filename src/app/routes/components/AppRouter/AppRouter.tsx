import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Roles } from '@constants';
import { NotFoundPage } from '@pages/NotFoundPage.tsx';
import { RouteWrapper } from '@routes/components/RouteWrapper/RouteWrapper.tsx';
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
        const availableFor = [...route.availableFor, Roles.SUPER_ADMIN];
        if (user && availableFor.includes(user.permissionGroup))
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
          <RouteWrapper withLayout={true}>
            <NotFoundPage />
          </RouteWrapper>
        }
      />
    </Routes>
  );
};
