import { Roles } from '@constants/Roles';
import {
  AuthorizationPage,
  MatchTestPage,
  MatchTestSettingsPage,
  RegistrationPage,
  TestPage,
} from '@pages';
import { CreationModulePage } from '@pages/CreationModulePage.tsx';
import { ModulesFoldersPage } from '@pages/ModulesFoldersPage.tsx';
import { ModulesListPage } from '@pages/ModulesListPage.tsx';

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
  { path: appPaths.AUTHORIZATION, element: <AuthorizationPage /> },
];

// Роуты, доступные только авторизированным юзерам
export const privateRoutes: IPrivateRoute[] = [
  {
    path: appPaths.MATCH_TEST,
    element: <MatchTestPage />,
    availableFor: [Roles.user],
  },
  {
    path: appPaths.MATCH_TEST_SETTINGS,
    element: <MatchTestSettingsPage />,
    availableFor: [Roles.user],
  },
  {
    path: appPaths.MODULES_CREATE,
    element: <CreationModulePage />,
    availableFor: [Roles.user],
  },
  {
    path: appPaths.MODULES,
    element: <ModulesListPage />,
    availableFor: [Roles.user],
  },
  {
    path: appPaths.FOLDERS,
    element: <ModulesFoldersPage />,
    availableFor: [Roles.user],
  },
];
