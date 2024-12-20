import { FC } from 'react';
import { useI18N } from '@i18n';
import { NavigationItem } from '@modules/layout/components/NavigationItem/NavigationItem.tsx';
import {
  NAVBAR_RIGHT_PADDING,
  NAVBAR_WIDTH,
} from '@modules/layout/constants.ts';
import { INavigationItem, privateNavigation, publicNavigation } from '@routes';
import { useAppSelector } from '@store';
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
  const { t } = useI18N();
  const { user } = useAppSelector(state => state.auth);
  const getNavigationItems = (navigation: INavigationItem[]) => {
    return navigation.map((item, i) => {
      return <NavigationItem {...item} key={i} />;
    });
  };

  return (
    <motion.div initial={false} animate={props.opened ? 'open' : 'closed'}>
      <div className={styles.listWrapper}>
        <motion.ul
          variants={variants}
          className={styles.list}
          style={{ width: NAVBAR_WIDTH - NAVBAR_RIGHT_PADDING }}
        >
          {user
            ? getNavigationItems(privateNavigation(t))
            : getNavigationItems(publicNavigation(t))}
        </motion.ul>
      </div>
    </motion.div>
  );
};
