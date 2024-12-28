import { FC, useContext } from 'react';
import { Flex, Image, useMantineTheme } from '@mantine/core';
import { AchievementsBoardContext } from '@modules/achievements/context/AchievementsBoardContext.ts';
import { AchievementSchemaInfer } from '@modules/achievements/types/AchievementSchema.ts';
import { motion } from 'framer-motion';

import styles from './AchievementsBoardCell.module.css';

interface IAchievementsBoardCellProps {
  achievement: AchievementSchemaInfer | null;
}

export const AchievementsBoardCell: FC<IAchievementsBoardCellProps> = props => {
  const theme = useMantineTheme();
  const context = useContext(AchievementsBoardContext);
  // const { show, scope } = useShowAchievementAnimation();
  //
  // useEffect(() => {
  //   if (context.boardHeight !== 0) show();
  // }, [context.boardHeight]);

  console.log(context.boardHeight);

  return (
    <Flex
      justify={'center'}
      align={'center'}
      h={128}
      bg={theme.white}
      className={styles.cell}
    >
      {context.boardHeight !== 0 ? (
        <motion.div
          initial={{
            translateY: -context.boardHeight,
          }}
          animate={{
            translateY: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <Image
            radius={'md'}
            src={props.achievement?.icon}
            alt={props.achievement?.name}
            h={80}
            w={80}
          />
        </motion.div>
      ) : undefined}
    </Flex>
  );
};
