import { Navbar } from '@components/AppLayout/components/SidePanel/components/Navbar/Navbar.tsx';
import { AppShell, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MatchTestPage } from '@pages/MatchTestPage.tsx';

import { Header } from '../Header/Header';

import { navbarConfiguration } from './components/Navbar/navbarConfiguration.ts';

import styles from '../Header/Header.module.css';

export const SidePanel = () => {
  const [opened, { toggle }] = useDisclosure();

  const title = 'Text';

  const pinned = true;

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={navbarConfiguration(opened)}
      padding="md"
    >
      <AppShell.Header>
        <Flex align="center">
          <div className={styles.headerContainer}>
            <Header
              pinned={pinned}
              title={title}
              toggle={toggle}
              opened={opened}
            />
          </div>
        </Flex>
      </AppShell.Header>

      <Navbar opened={opened} />

      <AppShell.Main>
        <MatchTestPage />
      </AppShell.Main>
    </AppShell>
  );
};
