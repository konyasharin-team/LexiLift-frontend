import { FC } from 'react';
import { AppShell, Flex } from '@mantine/core';
import { Navigation } from '@modules/layout/components/Navigation/Navigation.tsx';

interface INavbarProps {
  opened: boolean;
}

export const Navbar: FC<INavbarProps> = props => {
  return (
    <Flex p={'md'} direction={'column'} gap={10}>
      <AppShell.Section>
        <Navigation opened={props.opened} />
      </AppShell.Section>
    </Flex>
  );
};
