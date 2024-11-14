import { FC } from 'react';
import { NavigationItem } from '@components/AppLayout/components/NavigationItem/NavigationItem.tsx';
import { appPaths } from '@routes';
import { motion, Variants } from 'framer-motion';
import styles from './Navigation.module.css'

interface INavigationProps {
  opened: boolean;
}

const variants: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation: FC<INavigationProps> = props => {
  return (
    <motion.nav initial={false} animate={props.opened ? 'open' : 'closed'}>
      <motion.ul variants={variants} className={styles.list}>
        <NavigationItem to={appPaths.TEST}>test</NavigationItem>
        <NavigationItem to={appPaths.NOT_FOUND}>test1</NavigationItem>
      </motion.ul>
    </motion.nav>
  );
};
