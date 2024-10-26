import { createTheme } from '@mantine/core';
import { appColors } from './appColors.ts';

export const mainTheme = createTheme({
  colors: {
    white: appColors.white,
    greyApp: appColors.greyApp,
  },
});
