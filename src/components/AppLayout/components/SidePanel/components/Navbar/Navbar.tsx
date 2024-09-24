import { FC } from 'react';
import { AppShell } from '@mantine/core';

interface NavbarProps {
  opened: boolean;
}

export const Navbar: FC<NavbarProps> = props => {
  return (
    <AppShell.Navbar>
      {props.opened && (
        <div>
          <p>Navbar content goes here</p>
        </div>
      )}
    </AppShell.Navbar>
  );
};

export default Navbar;
