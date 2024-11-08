import { Flex, Paper, Text } from '@mantine/core';
import { CreateFolder } from '@modules/modulesFolders/components/CreateFolder/CreateFolder.tsx';
import { foldersData } from '@modules/modulesFolders/data.ts';

export const Folders = () => {
  return (
    <>
      <Flex justify="center">
        <CreateFolder />
      </Flex>
      <Flex direction="column" gap={20} p={20}>
        {foldersData.map((module, index) => (
          <Flex justify="center" key={index}>
            <Paper shadow="lg" radius="md" w="45%" withBorder>
              <Text size="lg" p={20}>
                {' '}
                {module.title}
              </Text>
              <Text size="sm" p={20}>
                Количество модулей: {module.count}
              </Text>
            </Paper>
          </Flex>
        ))}
      </Flex>
    </>
  );
};
