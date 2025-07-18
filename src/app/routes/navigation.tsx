import { NAVIGATION_ICON_SIZE } from '@constants';
import { Resource } from '@i18n';
import { appPaths } from '@routes/appPaths.ts';
import { INavigationItem } from '@routes/types/INavigationItem.ts';
import {
  IconCertificate,
  IconFile,
  IconFolderFilled,
  IconLaurelWreath,
  IconLogin2,
  IconTestPipe,
} from '@tabler/icons-react';

export const privateNavigation = (t: Resource): INavigationItem[] => [
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
    icon: <IconLaurelWreath size={NAVIGATION_ICON_SIZE} />,
    to: appPaths.ACHIEVEMENTS,
    text: t.navigation.achievements,
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
