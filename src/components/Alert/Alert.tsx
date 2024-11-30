import { FC, useEffect, useMemo, useState } from 'react';
import { getColor } from '@components/Alert/utils/getColor.ts';
import { useFinishingAnimations } from '@hooks';
import { Alert as MantineAlert, AlertProps } from '@mantine/core';
import { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

export type AlertType = 'error' | 'info' | 'warning' | 'success';

export interface IAlertProps extends AlertProps {
  type: AlertType;
  setOpened: (open: boolean) => void;
  opened: boolean;
  durationOpen?: number;
  durationClose?: number;
  delay?: number;
  title?: string;
  text?: string;
}

export const Alert: FC<IAlertProps> = ({
  type,
  setOpened,
  title,
  text,
  opened,
  delay,
  durationOpen,
  durationClose,
  ...attributes
}) => {
  const variants: Variants = useMemo(
    () => ({
      opened: {
        transition: {
          duration: durationOpen ?? 0,
          delay: delay ?? 0,
        },
        height: 'fit-content',
        opacity: 1,
        zIndex: 0,
      },
      closed: {
        transition: {
          duration: durationClose ?? 0,
          delay: 0,
        },
        zIndex: -1,
        height: 0,
        opacity: 0,
      },
    }),
    [delay, durationOpen, durationClose],
  );
  const getVariant = () => {
    return opened ? 'opened' : 'closed';
  };

  const [variant, setVariant] = useState<'opened' | 'closed'>(() =>
    getVariant(),
  );
  const { cashedVariant, attributes: useFinishingAttributes } =
    useFinishingAnimations(variant);

  useEffect(() => {
    setVariant(() => getVariant());
  }, [opened]);

  return (
    <motion.div
      variants={variants}
      initial={variant}
      animate={cashedVariant}
      style={{ width: '100%' }}
      {...useFinishingAttributes}
    >
      <MantineAlert
        variant="light"
        color={getColor(type)}
        title={title}
        withCloseButton={true}
        onClose={() => setOpened(false)}
        {...attributes}
      >
        {text}
      </MantineAlert>
    </motion.div>
  );
};
