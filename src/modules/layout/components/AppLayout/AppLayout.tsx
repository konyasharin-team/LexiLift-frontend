import { FC, ReactNode } from 'react';
import { AppShell } from '@mantine/core';
import { Header } from '@modules/layout/components/Header/Header.tsx';
import { Navbar } from '@modules/layout/components/Navbar/Navbar.tsx';
import { headerConfiguration } from '@modules/layout/utils/headerConfiguration.ts';
import { navbarConfiguration } from '@modules/layout/utils/navbarConfiguration.ts';
import { useActions, useAppSelector } from '@store';

import styles from './AppLayout.module.css';

interface IAppLayoutProps {
  children?: ReactNode;
}

export const AppLayout: FC<IAppLayoutProps> = props => {
  const { burgerIsActive, appLayoutIsActive } = useAppSelector(
    state => state.layout,
  );
  const { setBurgerIsActive } = useActions();

  return (
    <AppShell
      className={styles.layout}
      header={headerConfiguration(appLayoutIsActive)}
      navbar={navbarConfiguration(burgerIsActive, appLayoutIsActive)}
      padding="md"
    >
      <AppShell.Header className={styles.header}>
        <Header
          layoutIsActive={appLayoutIsActive}
          setBurgerOpened={setBurgerIsActive}
          burgerOpened={burgerIsActive}
        />
      </AppShell.Header>

      <AppShell.Navbar className={styles.navbar}>
        <Navbar opened={burgerIsActive} />
      </AppShell.Navbar>

      <AppShell.Main>{props.children}</AppShell.Main>
    </AppShell>
  );
};
