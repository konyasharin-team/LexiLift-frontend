import { appPaths } from '@routes/appPaths.ts';
import { INavigationItem } from '@routes/types/INavigationItem.ts';
import {
  IconFile,
  IconFolderFilled,
  IconLayoutDashboardFilled, IconTestPipe,
} from '@tabler/icons-react';

export const navigation: INavigationItem[] = [
  {
    icon: <IconLayoutDashboardFilled size={36} />,
    to: appPaths.MATCH_TEST_SETTINGS,
    text: 'Тест на сопоставление (в разработке)',
  },
  {
    icon: <IconFolderFilled size={36} />,
    to: appPaths.FOLDERS,
    text: 'Папки (в разработке)',
  },
  {
    icon: <IconFile size={36} />,
    to: appPaths.MODULES,
    text: 'Модули (в разработке)',
  },
  {
    icon: <IconTestPipe size={36} />,
    to: appPaths.TEST,
    text: 'Для тестирования',
  },
];
