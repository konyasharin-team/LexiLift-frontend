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
  ProfilePage,
  RegistrationPage,
  TestPage,
} from '@pages';

import { IPrivateRoute } from './types/IPrivateRoute.ts';
import { IRoute } from './types/IRoute.ts';
import { appPaths } from './appPaths.ts';

// Роуты, доступные всем
export const routes: IRoute[] = [
  { path: appPaths.TEST, element: <TestPage />, withLayout: true },
];

// Роуты, доступные только не авторизированным юзерам
export const publicRoutes: IRoute[] = [
  {
    path: appPaths.REGISTRATION,
    element: <RegistrationPage />,
  },
  {
    path: appPaths.AUTHORIZATION,
    element: <AuthorizationPage />,
  },
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
  },
  {
    path: appPaths.MATCH_TEST_RESULTS,
    element: <MatchTestResultsPage />,
    availableFor: [Roles.USER],
  },
  {
    path: appPaths.MODULES_CREATE,
    element: <CreateModulePage />,
    availableFor: [Roles.USER],
  },
  {
    path: appPaths.MODULES,
    element: <ModulesListPage />,
    availableFor: [Roles.USER],
  },
  {
    path: appPaths.FOLDERS,
    element: <FoldersPage />,
    availableFor: [Roles.USER],
  },
  {
    path: appPaths.COURSES,
    element: <CoursesPage />,
    availableFor: [Roles.USER],
  },
  {
    path: appPaths.COURSE,
    element: <CoursePage />,
    availableFor: [Roles.USER],
  },
  {
    path: appPaths.PROFILE,
    element: <ProfilePage />,
    availableFor: [Roles.USER],
  },
];
