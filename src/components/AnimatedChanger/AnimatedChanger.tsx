import { forwardRef, ReactNode, Ref } from 'react';
import { IContent } from '@components/AnimatedChanger/types/IContent.ts';
import { motion } from 'framer-motion';

import styles from './AnimatedChanger.module.css';

interface IAnimatedChangerProps<T extends string> {
  content: IContent<T>[];
  children?: ReactNode;
}

export const AnimatedChanger = forwardRef(
  <T extends string>(
    props: IAnimatedChangerProps<T>,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <motion.div className={styles.block} ref={ref}>
        {props.children}
      </motion.div>
    );
  },
);
