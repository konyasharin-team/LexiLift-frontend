import { CreateModule } from '@modules/vocabularyModule/components/CreateModule/CreateModule.tsx';
import { AutorizationPage } from '@pages/AutorizationPage.tsx';
import { RegistrationPage } from '@pages/RegistrationPage.tsx';
import { TestPage } from '@pages/TestPage.tsx';

import { appPaths } from './appPaths.ts';
import { IRoute } from './IRoute.ts';

export const routesList: IRoute[] = [
  { path: appPaths.TEST, element: <TestPage /> },
  { path: appPaths.REGISTRATION, element: <RegistrationPage /> },
  { path: appPaths.AUTHORIZATION, element: <AutorizationPage /> },
  {
    path: appPaths.CREATIONMODULE,
    element: <CreateModule />,
  },
];
