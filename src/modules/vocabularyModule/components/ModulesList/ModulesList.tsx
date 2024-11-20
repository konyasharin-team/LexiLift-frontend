import { Badge, Flex, Paper, Text } from '@mantine/core';
import { CreateModuleButton } from '@modules/vocabularyModule/components/CreateModuleButton/CreateModuleButton.tsx';
import { modulesData } from '@modules/vocabularyModule/data.ts';
import { getRandomColor } from '@modules/vocabularyModule/utils/randomColor.ts';
import { IconEye, IconPencil } from '@tabler/icons-react';

import styles from './ModulesList.module.css';

export const ModulesList = () => {
  return (
    <>
      <Flex justify="center">
        <CreateModuleButton />
      </Flex>
      <Flex justify="center" direction="column" p={20} gap="md">
        {modulesData.map((module, index) => (
          <Paper key={index} shadow="lg" p="md" radius="md">
            <Text size="lg">{module.title}</Text>
            <Flex justify="space-between">
              <Text size="sm" mt="xs">
                {module.description}
              </Text>
              <Flex direction="column" gap={5}>
                <IconEye className={styles.icon} />
                <IconPencil className={styles.icon} />
              </Flex>
            </Flex>
            <Flex mt="md" gap="xs">
              {module.tags.map((tag, idx) => (
                <Badge key={idx} color={getRandomColor()} variant="light">
                  {tag}
                </Badge>
              ))}
            </Flex>
          </Paper>
        ))}
      </Flex>
    </>
  );
};
