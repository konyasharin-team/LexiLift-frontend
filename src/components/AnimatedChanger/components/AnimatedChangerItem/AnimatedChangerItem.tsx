import { ReactNode, useEffect, useState } from 'react';
import { IContent } from '@components/AnimatedChanger';
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
    transition: { duration: 0.7, ease: 'easeInOut' },
    top: 0,
  },
  center: {
    x: 0,
    opacity: 1,
    position: 'relative',
    transition: { duration: 0.5, ease: 'easeInOut' },
    top: 0,
  },
  right: {
    x: 500,
    opacity: 0,
    position: 'absolute',
    transition: { duration: 0.7, ease: 'easeInOut' },
    top: 0,
  },
};

export const AnimatedChangerItem = <T extends string>(
  props: IAnimatedChangerItemProps<T>,
) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const [cashedVariant, setCashedVariant] = useState<IContent<T>['position']>(
    props.variant,
  );

  useEffect(() => {
    if (!isAnimating && props.variant !== cashedVariant)
      setCashedVariant(props.variant);
  }, [props.variant, isAnimating]);

  return (
    <motion.div
      initial={props.variant}
      animate={cashedVariant}
      variants={variants}
      onAnimationStart={() => setIsAnimating(true)}
      onAnimationComplete={() => setIsAnimating(false)}
      className={styles.block}
    >
      {props.children}
    </motion.div>
  );
};
