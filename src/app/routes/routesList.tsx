import { TestPage } from '@pages/TestPage.tsx';

import { appPaths } from './appPaths.ts';
import { IRoute } from './IRoute.ts';

export const routesList: IRoute[] = [
  { path: appPaths.TEST, element: <TestPage /> },
];
