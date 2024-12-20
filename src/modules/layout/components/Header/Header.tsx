import { FC } from 'react';
import { Burger, Flex } from '@mantine/core';
import { CLOSED_NAVBAR_WIDTH } from '@modules/layout';
import { UserAvatarButton } from '@modules/layout/components/UserAvatarButton';
import { useAppSelector } from '@store';
import { Logo } from '@ui/Logo';

import styles from './Header.module.css';

interface IHeaderProps {
  setBurgerOpened: (newOpened: boolean) => void;
  burgerOpened: boolean;
  layoutIsActive: boolean;
}

export const Header: FC<IHeaderProps> = props => {
  const { user } = useAppSelector(state => state.auth);

  return (
    <Flex
      align={'center'}
      h={'100%'}
      justify={'space-between'}
      pr={16}
      style={{ overflow: 'hidden' }}
    >
      <Flex
        align={'center'}
        justify={'center'}
        h={'100%'}
        p={'md'}
        className={!props.layoutIsActive ? styles.hide : undefined}
        w={CLOSED_NAVBAR_WIDTH}
      >
        <Burger
          opened={props.burgerOpened}
          onClick={() => props.setBurgerOpened(!props.burgerOpened)}
          size="lg"
        />
      </Flex>
      <Flex gap={40}>
        <Logo />
        {user ? <UserAvatarButton user={user} /> : undefined}
      </Flex>
    </Flex>
  );
};
