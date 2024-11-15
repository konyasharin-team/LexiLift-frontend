import {
  CLOSED_NAVBAR_WIDTH,
  NAVBAR_WIDTH,
} from '@components/AppLayout/constants.ts';
import { AppShellNavbarConfiguration } from '@mantine/core';

export const navbarConfiguration = (
  isOpened: boolean,
  layoutIsActive: boolean,
): AppShellNavbarConfiguration => {
  return {
    width: layoutIsActive ? (isOpened ? NAVBAR_WIDTH : CLOSED_NAVBAR_WIDTH) : 0,
    breakpoint: 'sm',
  };
};
