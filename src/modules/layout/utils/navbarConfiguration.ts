import { AppShellNavbarConfiguration } from '@mantine/core';
import {
  CLOSED_NAVBAR_WIDTH,
  NAVBAR_WIDTH,
} from '@modules/layout/constants.ts';

export const navbarConfiguration = (
  isOpened: boolean,
  layoutIsActive: boolean,
): AppShellNavbarConfiguration => {
  return {
    width: layoutIsActive ? (isOpened ? NAVBAR_WIDTH : CLOSED_NAVBAR_WIDTH) : 0,
    breakpoint: 'sm',
  };
};
