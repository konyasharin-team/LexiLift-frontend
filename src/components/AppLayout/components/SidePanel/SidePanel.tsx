import { Navbar } from '@components/AppLayout/components/SidePanel/components/Navbar/Navbar.tsx';
import { FlipCard, useFlipCard } from '@components/FlipCard';
import { AppShell, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Header } from '../Header/Header';

import { navbarConfiguration } from './components/Navbar/navbarConfiguration.ts';

import styles from '../Header/Header.module.css';
import { MatchTestPage } from '@pages/MatchTestPage.tsx';

export const SidePanel = () => {
  const [opened, { toggle }] = useDisclosure();
  const [value, toggleCard] = useFlipCard();

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
        <FlipCard
          word={'back'}
          translation={'translate'}
          activeSide={value}
          onClick={() => toggleCard()}
        />
        <MatchTestPage />
      </AppShell.Main>
    </AppShell>
  );
};

export default SidePanel;
