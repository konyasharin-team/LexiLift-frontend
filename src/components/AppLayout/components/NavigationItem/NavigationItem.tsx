import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Flex, Text, useMantineTheme } from '@mantine/core';
import { INavigationItem } from '@routes';
import { motion, Variants } from 'framer-motion';

import styles from './NavigationItem.module.css';

const variants: Variants = {
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

export const NavigationItem: FC<INavigationItem> = props => {
  const theme = useMantineTheme();
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1, translateX: 20, color: theme.colors.blue[9] }}
      whileTap={{ scale: 0.95 }}
      className={styles.item}
    >
      <NavLink
        to={props.to}
        className={({ isActive }) => (isActive ? styles.linkActive : undefined)}
      >
        <Flex gap={10} align={'center'}>
          {props.icon}
          <Text fz={18} fw={500} tt={'capitalize'}>
            {props.text}
          </Text>
        </Flex>
      </NavLink>
    </motion.li>
  );
};
