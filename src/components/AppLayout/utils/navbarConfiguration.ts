import { NAVBAR_WIDTH } from '@components/AppLayout/constants.ts';
import { AppShellNavbarConfiguration } from '@mantine/core';

export const navbarConfiguration = (
  isOpened: boolean,
): AppShellNavbarConfiguration => {
  return {
    width: isOpened ? NAVBAR_WIDTH : 0,
    breakpoint: 'sm',
  };
};
