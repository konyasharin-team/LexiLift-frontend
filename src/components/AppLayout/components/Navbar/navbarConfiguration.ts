import { AppShellNavbarConfiguration } from '@mantine/core';

export const navbarConfiguration = (
  isOpened: boolean,
): AppShellNavbarConfiguration => {
  return {
    width: isOpened ? 300 : 0,
    breakpoint: 'sm',
  };
};
