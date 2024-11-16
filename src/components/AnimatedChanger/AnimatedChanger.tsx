import { AnimatedChangerItem } from '@components/AnimatedChanger/components/AnimatedChangerItem/AnimatedChangerItem.tsx';
import { IContent } from '@components/AnimatedChanger/types/IContent.ts';
import { motion } from 'framer-motion';

import styles from './AnimatedChanger.module.css';

interface IAnimatedChangerProps<T extends string> {
  content: IContent<T>[];
  maxHeight: number;
}

export const AnimatedChanger = <T extends string>(
  props: IAnimatedChangerProps<T>,
) => {
  return (
    <motion.div className={styles.block} style={{ height: props.maxHeight }}>
      {props.content.map((item, i) => (
        <AnimatedChangerItem variant={item.position} key={i}>
          {item.element}
        </AnimatedChangerItem>
      ))}
    </motion.div>
  );
};
