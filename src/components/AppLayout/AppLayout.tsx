import { FC, ReactNode } from 'react';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Header } from './components/Header/Header.tsx';
import Navbar from './components/Navbar/Navbar.tsx';
import { navbarConfiguration } from './components/Navbar/navbarConfiguration.ts';

import styles from './AppLayout.module.css';

interface IAppLayoutProps {
  children?: ReactNode;
}

export const AppLayout: FC<IAppLayoutProps> = props => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      className={styles.layout}
      header={{ height: 60 }}
      navbar={navbarConfiguration(opened)}
      padding="md"
    >
      <AppShell.Header>
        <Header pinned={true} title={'Text'} toggle={toggle} opened={opened} />
      </AppShell.Header>

      <AppShell.Navbar className={styles.navbar}>
        <Navbar opened={opened} />
      </AppShell.Navbar>

      <AppShell.Main>{props.children}</AppShell.Main>
    </AppShell>
  );
};
