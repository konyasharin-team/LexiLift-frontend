import { ReactNode } from 'react';
import { IContent } from '@components/AnimatedChanger';
import { useFinishingAnimations } from '@hooks';
import { motion, Variants } from 'framer-motion';

import styles from './AnimatedChangerItem.module.css';

interface IAnimatedChangerItemProps<T extends string> {
  variant: IContent<T>['position'];
  children?: ReactNode;
}

const variants: Variants = {
  left: {
    x: -500,
    opacity: 0,
    position: 'absolute',
    transition: { duration: 0.5, ease: 'easeInOut' },
    top: 0,
    zIndex: 0,
  },
  center: {
    x: 0,
    opacity: 1,
    position: 'relative',
    transition: { duration: 0.5, ease: 'easeInOut' },
    top: 0,
    zIndex: 1,
  },
  right: {
    x: 500,
    opacity: 0,
    position: 'absolute',
    transition: { duration: 0.5, ease: 'easeInOut' },
    top: 0,
    zIndex: 0,
  },
};

export const AnimatedChangerItem = <T extends string>(
  props: IAnimatedChangerItemProps<T>,
) => {
  const { cashedVariant, attributes } = useFinishingAnimations(props.variant);

  return (
    <motion.div
      initial={props.variant}
      animate={cashedVariant}
      variants={variants}
      className={styles.block}
      {...attributes}
    >
      {props.children}
    </motion.div>
  );
};
