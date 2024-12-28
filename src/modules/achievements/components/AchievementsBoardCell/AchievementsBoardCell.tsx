import { FC } from 'react';
import {
  Flex,
  HoverCard,
  Image,
  Paper,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { AchievementSchemaInfer } from '@modules/achievements/types/AchievementSchema.ts';
import { motion, Variants } from 'framer-motion';

import styles from './AchievementsBoardCell.module.css';

interface IAchievementsBoardCellProps {
  achievement: AchievementSchemaInfer | null;
}

const variants: Variants = {
  visible: {
    translateY: 0,
    transition: {
      duration: 0.5,
    },
  },
  invisible: {
    translateY: -256,
  },
};

export const AchievementsBoardCell: FC<IAchievementsBoardCellProps> = props => {
  const theme = useMantineTheme();

  return (
    <Paper shadow={'md'} className={styles.cell} bg={theme.colors.gray[0]}>
      <Flex justify={'center'} align={'center'} h={128}>
        <motion.div variants={variants}>
          <HoverCard openDelay={100} closeDelay={100}>
            <HoverCard.Target>
              <Image
                radius={'md'}
                src={props.achievement?.icon}
                alt={props.achievement?.name}
                h={80}
                w={80}
              />
            </HoverCard.Target>
            <HoverCard.Dropdown bg={'blue'}>
              <Text c={theme.white}>{props.achievement?.description}</Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </motion.div>
      </Flex>
    </Paper>
  );
};
