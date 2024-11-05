import { AutorizationPage } from '@pages/AutorizationPage.tsx';
import { MatchTestPage } from '@pages/MatchTestPage.tsx';
import { RegistrationPage } from '@pages/RegistrationPage.tsx';
import { TestPage } from '@pages/TestPage.tsx';

import { Roles } from '@constants/Roles';

import { IPrivateRoute } from './types/IPrivateRoute.ts';
import { IRoute } from './types/IRoute.ts';
import { appPaths } from './appPaths.ts';

// Роуты, доступные всем
export const routes: IRoute[] = [
  { path: appPaths.TEST, element: <TestPage /> },
];

// Роуты, доступные только не авторизированным юзерам
export const publicRoutes: IRoute[] = [
  { path: appPaths.REGISTRATION, element: <RegistrationPage /> },
  { path: appPaths.AUTHORIZATION, element: <AutorizationPage /> },
];

// Роуты, доступные только авторизированным юзерам
export const privateRoutes: IPrivateRoute[] = [
  {
    path: appPaths.MATCH_TEST,
    element: <MatchTestPage />,
    availableFor: [Roles.user],
  },
];
