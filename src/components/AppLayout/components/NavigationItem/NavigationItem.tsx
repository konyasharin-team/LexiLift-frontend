import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Text } from '@mantine/core';
import { motion, Variants } from 'framer-motion';

interface INavigationItemProps {
  to: string;
  children?: string;
}

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

export const NavigationItem: FC<INavigationItemProps> = props => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1, translateX: 20 }}
      whileTap={{ scale: 0.95 }}
    >
      <NavLink to={props.to}>
        <Text c={'dark'} fz={18} fw={500} tt={'capitalize'}>{props.children}</Text>
      </NavLink>
    </motion.li>
  );
};
