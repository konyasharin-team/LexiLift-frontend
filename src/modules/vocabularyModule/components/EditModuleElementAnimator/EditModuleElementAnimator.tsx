import { FC, ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface IEditModuleElementAnimatorProps {
  children?: ReactNode;
}

const variants: Variants = {
  off: {
    opacity: 0,
    x: -100,
    transition: {
      duration: 0.2,
    },
  },
  on: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      x: {
        stiffness: 1000,
      },
    },
  },
};

export const EditModuleElementAnimator: FC<
  IEditModuleElementAnimatorProps
> = props => {
  return (
    <motion.div
      variants={variants}
      exit={{
        opacity: 0,
        x: 100,
      }}
      layout={true}
    >
      {props.children}
    </motion.div>
  );
};
