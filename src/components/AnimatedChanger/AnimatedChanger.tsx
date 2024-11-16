import { forwardRef, Ref } from 'react';
import { AnimatedChangerItem } from '@components/AnimatedChanger/components/AnimatedChangerItem/AnimatedChangerItem.tsx';
import { IContent } from '@components/AnimatedChanger/types/IContent.ts';
import { motion } from 'framer-motion';

import styles from './AnimatedChanger.module.css';

interface IAnimatedChangerProps<T extends string> {
  content: IContent<T>[];
}

export const AnimatedChanger = forwardRef(
  <T extends string>(
    props: IAnimatedChangerProps<T>,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <motion.div className={styles.block} ref={ref}>
        {props.content.map((item, i) => (
          <AnimatedChangerItem variant={item.position} key={i}>
            {item.element}
          </AnimatedChangerItem>
        ))}
      </motion.div>
    );
  },
);
