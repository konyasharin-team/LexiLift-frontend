import { FC, ReactNode } from 'react';
import { Paper, SimpleGrid, useMantineTheme } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { AchievementsBoardCell } from '@modules/achievements/components/AchievementsBoardCell';
import { AchievementsBoardContext } from '@modules/achievements/context/AchievementsBoardContext.ts';
import { AchievementSchemaInfer } from '@modules/achievements/types/AchievementSchema.ts';

import styles from './AchievementsBoard.module.css';

interface IAchievementsBoardProps {
  achievements: AchievementSchemaInfer[];
}

const ACHIEVEMENTS_COUNT = 36;

export const AchievementsBoard: FC<IAchievementsBoardProps> = props => {
  const theme = useMantineTheme();
  const { ref, height } = useElementSize();

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
    <Paper
      p={'xl'}
      shadow={'xl'}
      bg={theme.colors.gray[3]}
      className={styles.board}
      ref={ref}
    >
      <AchievementsBoardContext.Provider value={{ boardHeight: height }}>
        <SimpleGrid cols={7} spacing={'xl'}>
          {generateAchievementsElements()}
        </SimpleGrid>
      </AchievementsBoardContext.Provider>
    </Paper>
  );
};
