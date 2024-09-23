import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Header } from '../Header/Header';

export const SidePanel = () => {
  const [opened, { toggle }] = useDisclosure();

  const headerData = {
    title: 'Text',
  };

  const pinned = true;

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: opened ? 300 : 0,
        breakpoint: 'sm',
      }}
      padding="md"
    >
      <AppShell.Header>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Header pinned={pinned} data={headerData} />

          <Burger opened={opened} onClick={toggle} size="sm" ml="auto" />
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md" hidden={!opened}>
        Navbar content goes here
      </AppShell.Navbar>

      <AppShell.Main>Main content goes here</AppShell.Main>
    </AppShell>
  );
};

export default SidePanel;
