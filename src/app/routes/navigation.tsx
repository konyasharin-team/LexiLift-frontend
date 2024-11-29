import { NAVIGATION_ICON_SIZE } from '@constants';
import { appPaths } from '@routes/appPaths.ts';
import { INavigationItem } from '@routes/types/INavigationItem.ts';
import {
  IconCertificate,
  IconFile,
  IconFolderFilled,
  IconLayoutDashboardFilled,
  IconLogin2,
  IconTestPipe,
} from '@tabler/icons-react';

export const privateNavigation: INavigationItem[] = [
  {
    icon: <IconLayoutDashboardFilled size={NAVIGATION_ICON_SIZE} />,
    to: appPaths.MATCH_TEST_SETTINGS,
    text: 'Тест на сопоставление (в разработке)',
    pathsToCompare: [appPaths.MATCH_TEST],
  },
  {
    icon: <IconFolderFilled size={NAVIGATION_ICON_SIZE} />,
    to: appPaths.FOLDERS,
    text: 'Папки (в разработке)',
  },
  {
    icon: <IconFile size={NAVIGATION_ICON_SIZE} />,
    to: appPaths.MODULES,
    text: 'Модули (в разработке)',
  },
  {
    icon: <IconCertificate size={NAVIGATION_ICON_SIZE} />,
    to: appPaths.COURSES,
    text: 'Курсы (в разработке)',
  },
  {
    icon: <IconTestPipe size={NAVIGATION_ICON_SIZE} />,
    to: appPaths.TEST,
    text: 'Для тестирования',
  },
];

export const publicNavigation: INavigationItem[] = [
  {
    icon: <IconLogin2 size={NAVIGATION_ICON_SIZE} />,
    to: appPaths.AUTHORIZATION,
    text: 'Вход',
    pathsToCompare: [appPaths.REGISTRATION, appPaths.AUTHORIZATION],
  },
];
