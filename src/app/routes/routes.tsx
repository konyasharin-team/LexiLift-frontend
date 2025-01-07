import { Roles } from '@constants';
import {
  AchievementsPage,
  AuthorizationPage,
  CoursePage,
  CoursesPage,
  EditModulePage,
  FoldersPage,
  MatchTestPage,
  MatchTestResultsPage,
  MatchTestSettingsPage,
  ModulePage,
  ModulesListPage,
  ProfilePage,
  RegistrationPage,
  TestPage,
} from '@pages';
import { CourseEditorPage } from '@pages/CourseEditorPage.tsx';

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
    element: <EditModulePage />,
    availableFor: [Roles.USER],
  },
  {
    path: appPaths.MODULES,
    element: <ModulesListPage />,
    availableFor: [Roles.USER],
  },
  {
    path: appPaths.MODULE,
    element: <ModulePage />,
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
    path: appPaths.COURSE_EDITOR,
    element: <CourseEditorPage />,
    availableFor: [Roles.USER],
  },
  {
    path: appPaths.NEW_COURSE_EDITOR,
    element: <CourseEditorPage />,
    availableFor: [Roles.USER],
  },
  {
    path: appPaths.PROFILE,
    element: <ProfilePage />,
    availableFor: [Roles.USER],
  },
  {
    path: appPaths.ACHIEVEMENTS,
    element: <AchievementsPage />,
    availableFor: [Roles.USER],
  },
];
