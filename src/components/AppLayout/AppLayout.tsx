import { FC, ReactNode } from 'react';
import { headerConfiguration } from '@components/AppLayout/utils/headerConfiguration.ts';
import { AppShell } from '@mantine/core';
import { useActions, useAppSelector } from '@store';

import { Header } from './components/Header/Header.tsx';
import { Navbar } from './components/Navbar/Navbar.tsx';
import { navbarConfiguration } from './utils/navbarConfiguration.ts';

import styles from './AppLayout.module.css';
import { HEADER_HEIGHT } from '@components/AppLayout/constants.ts';

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
          title={'Text'}
          setBurgerOpened={setBurgerIsActive}
          burgerOpened={burgerIsActive}
        />
      </AppShell.Header>

      <AppShell.Navbar className={styles.navbar}>
        <Navbar opened={burgerIsActive} />
      </AppShell.Navbar>

      <AppShell.Main pt={HEADER_HEIGHT}>{props.children}</AppShell.Main>
    </AppShell>
  );
};
