import { NAVIGATION_ICON_SIZE } from '@constants';
import { Resource } from '@i18n';
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

export const privateNavigation = (t: Resource): INavigationItem[] => [
  {
    icon: <IconLayoutDashboardFilled size={NAVIGATION_ICON_SIZE} />,
    to: appPaths.MATCH_TEST_SETTINGS,
    text: t.navigation.compareTest,
    pathsToCompare: [appPaths.MATCH_TEST],
  },
  {
    icon: <IconFolderFilled size={NAVIGATION_ICON_SIZE} />,
    to: appPaths.FOLDERS,
    text: t.navigation.folders,
  },
  {
    icon: <IconFile size={NAVIGATION_ICON_SIZE} />,
    to: appPaths.MODULES,
    text: t.navigation.modules,
  },
  {
    icon: <IconCertificate size={NAVIGATION_ICON_SIZE} />,
    to: appPaths.COURSES,
    text: t.navigation.courses,
  },
  {
    icon: <IconTestPipe size={NAVIGATION_ICON_SIZE} />,
    to: appPaths.TEST,
    text: t.navigation.test,
  },
];

export const publicNavigation = (t: Resource): INavigationItem[] => [
  {
    icon: <IconLogin2 size={NAVIGATION_ICON_SIZE} />,
    to: appPaths.AUTHORIZATION,
    text: t.navigation.login,
    pathsToCompare: [appPaths.REGISTRATION, appPaths.AUTHORIZATION],
  },
];
