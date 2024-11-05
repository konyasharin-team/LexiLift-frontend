import AppLayout from '@components/AppLayout/AppLayout.tsx';
import { Button, Flex, Paper, Text } from '@mantine/core';
import { foldersData } from '@modules/modulesFolders/components/dataFolder.ts';

export const ModulesFolders = () => {
  return (
    <AppLayout>
      <Flex justify="center">
        <Button radius="md" size="md" color="blue" mt={20}>
          Создать папку с модулем
        </Button>
      </Flex>
      <Flex direction="column" gap={20} p={20}>
        {foldersData.map((module, index) => (
          <Flex justify="center" key={index}>
            <Paper shadow="lg" radius="md" w="45%" withBorder>
              <Text size="lg" p={20}> {module.title}</Text>
              <Text size="sm" p={20}>
                Количество модулей: {module.count}
              </Text>
            </Paper>
          </Flex>
        ))}
      </Flex>
    </AppLayout>
  );
};
