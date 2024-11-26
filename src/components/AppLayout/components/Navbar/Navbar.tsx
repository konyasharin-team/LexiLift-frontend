import { FC } from 'react';
import { Navigation } from '@components/AppLayout/components/Navigation/Navigation.tsx';
import { AppShell, Flex } from '@mantine/core';

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
