import { Roles } from '@constants/roles.ts';
import {
  AuthorizationPage,
  CoursePage,
  CoursesPage,
  CreateModulePage,
  FoldersPage,
  MatchTestPage,
  MatchTestResultsPage,
  MatchTestSettingsPage,
  ModulesListPage,
  RegistrationPage,
  TestPage,
} from '@pages';

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
    availableFor: [Roles.USER],
    withLayout: false,
  },
  {
    path: appPaths.MATCH_TEST_SETTINGS,
    element: <MatchTestSettingsPage />,
    availableFor: [Roles.USER],
    withLayout: true,
  },
  {
    path: appPaths.MATCH_TEST_RESULTS,
    element: <MatchTestResultsPage />,
    availableFor: [Roles.USER],
    withLayout: true,
  },
  {
    path: appPaths.MODULES_CREATE,
    element: <CreateModulePage />,
    availableFor: [Roles.USER],
    withLayout: true,
  },
  {
    path: appPaths.MODULES,
    element: <ModulesListPage />,
    availableFor: [Roles.USER],
    withLayout: true,
  },
  {
    path: appPaths.FOLDERS,
    element: <FoldersPage />,
    availableFor: [Roles.USER],
    withLayout: true,
  },
  {
    path: appPaths.COURSES,
    element: <CoursesPage />,
    availableFor: [Roles.USER],
    withLayout: true,
  },
  {
    path: appPaths.COURSE,
    element: <CoursePage />,
    availableFor: [Roles.USER],
    withLayout: true,
  },
];
