import { AppShellHeaderConfiguration } from '@mantine/core';
import { HEADER_HEIGHT } from '@modules/layout/constants.ts';

export const headerConfiguration = (
  isActive: boolean,
): AppShellHeaderConfiguration => {
  return {
    height: isActive ? HEADER_HEIGHT : 0,
  };
};
