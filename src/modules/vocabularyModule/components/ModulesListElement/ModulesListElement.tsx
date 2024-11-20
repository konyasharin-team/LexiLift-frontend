import { FC } from 'react';
import { Badge, Flex, Paper, Text } from '@mantine/core';
import { IModule } from '@modules/vocabularyModule/types/IModule.ts';
import { getRandomColor } from '@modules/vocabularyModule/utils/randomColor.ts';
import { IconEye, IconPencil } from '@tabler/icons-react';

import styles from '@modules/vocabularyModule/components/ModulesList/ModulesList.module.css';

export const ModulesListElement: FC<IModule> = props => {
  return (
    <Paper shadow="lg" p="md" radius="md">
      <Text size="lg">{props.title}</Text>
      <Flex justify="space-between">
        <Text size="sm" mt="xs">
          {props.description}
        </Text>
        <Flex direction="column" gap={5}>
          <IconEye className={styles.icon} />
          <IconPencil className={styles.icon} />
        </Flex>
      </Flex>
      <Flex mt="md" gap="xs">
        {props.tags.map((tag, idx) => (
          <Badge key={idx} color={getRandomColor()} variant="light">
            {tag}
          </Badge>
        ))}
      </Flex>
    </Paper>
  );
};
