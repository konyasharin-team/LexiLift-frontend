import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAVIGATION_ICON_SIZE } from '@constants';
import { Flex, Text, useMantineTheme } from '@mantine/core';
import { INavigationItem } from '@routes';
import { useAppSelector } from '@store';
import { motion, Variants } from 'framer-motion';

import styles from './NavigationItem.module.css';

const textVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const itemVariants: Variants = {
  open: {
    height: '100%',
  },
  closed: {
    height: `${NAVIGATION_ICON_SIZE}px`,
  },
};

export const NavigationItem: FC<INavigationItem> = props => {
  const theme = useMantineTheme();
  const { burgerIsActive } = useAppSelector(state => state.layout);
  const location = useLocation();

  const getLinkClassName = (routerDomIsActive: boolean) => {
    if (
      (!props.pathToCompare && routerDomIsActive) ||
      (props.pathToCompare && location.pathname.startsWith(props.pathToCompare))
    ) {
      if (burgerIsActive) return styles.linkActiveWithBurger;
      else return styles.linkActiveWithoutBurger;
    }
    return undefined;
  };

  return (
    <motion.li
      whileHover={
        burgerIsActive
          ? { scale: 1.1, translateX: 20, color: theme.colors.blue[9] }
          : { color: theme.colors.blue[9] }
      }
      whileTap={burgerIsActive ? { scale: 0.95 } : undefined}
      className={styles.item}
      variants={itemVariants}
    >
      <NavLink
        to={props.to}
        className={({ isActive }) => getLinkClassName(isActive)}
      >
        <Flex gap={15} align={'center'} h={'100%'}>
          {props.icon}
          <motion.span variants={textVariants}>
            <Text fz={18} fw={500} mt={15} mb={15}>
              {props.text}
            </Text>
          </motion.span>
        </Flex>
      </NavLink>
    </motion.li>
  );
};
