import { FC, ReactNode } from 'react';
import { Header } from '@components/AppLayout/components/Header/Header.tsx';
import Navbar from '@components/AppLayout/components/Navbar/Navbar.tsx';
import { navbarConfiguration } from '@components/AppLayout/components/Navbar/navbarConfiguration.ts';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface IAppLayoutProps {
  children?: ReactNode;
}

export const AppLayout: FC<IAppLayoutProps> = props => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={navbarConfiguration(opened)}
      padding="md"
    >
      <AppShell.Header>
        <Header pinned={true} title={'Text'} toggle={toggle} opened={opened} />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar opened={opened} />
      </AppShell.Navbar>

      <AppShell.Main>{props.children}</AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
