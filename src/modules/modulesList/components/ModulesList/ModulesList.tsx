import { FaEdit } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';
import AppLayout from '@components/AppLayout/AppLayout.tsx';
import { Badge, Button, Flex, Paper, Text } from '@mantine/core';
import { modulesData } from '@modules/modulesList/components/data.ts';

import styles from './ModulesList.module.css';

export const ModulesList = () => {
  const getRandomColor = () => {
    const colors = [
      'blue',
      'red',
      'green',
      'yellow',
      'orange',
      'purple',
      'teal',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <AppLayout>
      <Flex justify="center">
        <Button radius="md" size="md" color="blue" mt={20}>
          Создать модуль
        </Button>
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
    </AppLayout>
  );
};
