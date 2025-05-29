import { FC, ReactNode, useState } from 'react';
import { useI18N } from '@i18n';
import { Flex, Paper, ScrollArea, SimpleGrid, Text } from '@mantine/core';
import { useTimeout } from '@mantine/hooks';
import { AchievementsBoardCell } from '@modules/achievements/components/AchievementsBoardCell';
import { AchievementSchemaInfer } from '@modules/achievements/types/AchievementSchema.ts';
import { motion, Variants } from 'framer-motion';

import styles from './AchievementsBoard.module.css';

import achievementImg from '/images/achievement.png';

interface IAchievementsBoardProps {
  achievements: AchievementSchemaInfer[];
}

const ACHIEVEMENTS_COUNT = 36;

const boardElementsVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

const achievementImageVariants: Variants = {
  visible: {
    translateX: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  invisible: {
    translateX: -40,
    opacity: 0,
  },
};

const achievementTextVariants: Variants = {
  visible: {
    translateX: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  invisible: {
    translateX: -80,
    opacity: 0,
  },
};

export const AchievementsBoard: FC<IAchievementsBoardProps> = props => {
  const [isImitationLoading, setIsImitationLoading] = useState(true);
  useTimeout(() => setIsImitationLoading(false), 1000, { autoInvoke: true });
  const { t } = useI18N();

  const generateAchievementsElements = () => {
    const achievementsElements: ReactNode[] = [];
    const elementsCount =
      props.achievements.length < ACHIEVEMENTS_COUNT
        ? ACHIEVEMENTS_COUNT
        : props.achievements.length;

    for (let i = 0; i < elementsCount; i++) {
      if (i < props.achievements.length)
        achievementsElements.push(
          <AchievementsBoardCell achievement={props.achievements[i]} key={i} />,
        );
      else
        achievementsElements.push(
          <AchievementsBoardCell achievement={null} key={i} />,
        );
    }

    return achievementsElements;
  };

  return (
    <motion.div
      initial={'invisible'}
      animate={isImitationLoading ? 'invisible' : 'visible'}
    >
      <Flex direction={'column'} justify={'center'} gap={10} align={'center'}>
        <motion.img
          variants={achievementImageVariants}
          src={achievementImg}
          alt={'achievement'}
          className={styles.achievementImg}
        />
        <motion.div variants={achievementTextVariants}>
          <Text fw={700} fz={28} tt={'uppercase'}>
            {t.achievementsPage.yourAchievements}
          </Text>
        </motion.div>
      </Flex>
      <ScrollArea.Autosize mah={'60vh'} mt={30} type={'always'}>
        <Paper p={'xl'} shadow={'xl'}>
          <motion.div
            initial={'invisible'}
            animate={isImitationLoading ? 'invisible' : 'visible'}
            variants={boardElementsVariants}
          >
            <SimpleGrid cols={10} spacing={'xl'}>
              {generateAchievementsElements()}
            </SimpleGrid>
          </motion.div>
        </Paper>
      </ScrollArea.Autosize>
    </motion.div>
  );
};
