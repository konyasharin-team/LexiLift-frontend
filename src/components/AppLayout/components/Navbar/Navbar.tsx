import { FC } from 'react';
import { AppShell, Flex } from '@mantine/core';

interface NavbarProps {
  opened: boolean;
}

export const Navbar: FC<NavbarProps> = props => {
  return (
    <Flex p={'md'} direction={'column'} gap={10}>
      {props.opened && (
        <AppShell.Section>
          <div>
            <p>Navbar content goes here</p>
          </div>
        </AppShell.Section>
      )}
    </Flex>
  );
};

export default Navbar;
