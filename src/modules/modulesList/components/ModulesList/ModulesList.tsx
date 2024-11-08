import { FaEdit } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';
import { Badge, Flex, Paper, Text } from '@mantine/core';
import { CreateModuleCardButton } from '@modules/modulesList/components/CreateModuleCardButton/CreateModuleCard.tsx';
import { modulesData } from '@modules/modulesList/data.ts';
import { getRandomColor } from '@modules/modulesList/utils/RandomColor/RandomColor.ts';

import styles from './ModulesList.module.css';

export const ModulesList = () => {
  return (
    <>
      <Flex justify="center">
        <CreateModuleCardButton />
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
                <FaEye className={styles.icon} />
                <FaEdit className={styles.icon} />
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
