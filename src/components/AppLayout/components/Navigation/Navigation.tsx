import { FC } from 'react';
import { NavigationItem } from '@components/AppLayout/components/NavigationItem/NavigationItem.tsx';
import {
  NAVBAR_RIGHT_PADDING,
  NAVBAR_WIDTH,
} from '@components/AppLayout/constants.ts';
import { navigation } from '@routes';
import { motion, Variants } from 'framer-motion';

import styles from './Navigation.module.css';

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
    <motion.div initial={false} animate={props.opened ? 'open' : 'closed'}>
      <div className={styles.listWrapper}>
        <motion.ul
          variants={variants}
          className={styles.list}
          style={{ width: NAVBAR_WIDTH - NAVBAR_RIGHT_PADDING }}
        >
          {navigation.map((item, i) => {
            return <NavigationItem {...item} key={i} />;
          })}
        </motion.ul>
      </div>
    </motion.div>
  );
};
