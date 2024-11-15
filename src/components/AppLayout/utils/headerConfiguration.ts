import { HEADER_HEIGHT } from '@components/AppLayout/constants.ts';
import { AppShellHeaderConfiguration } from '@mantine/core';

export const headerConfiguration = (
  isActive: boolean,
): AppShellHeaderConfiguration => {
  return {
    height: isActive ? HEADER_HEIGHT : 0,
  };
};
