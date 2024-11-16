import { Flex, Text } from '@mantine/core';
import { IconLanguage } from '@tabler/icons-react';

export const Logo = () => {
  return (
    <Flex align={'center'} gap={5}>
      <IconLanguage size={36} />
      <Text fz={28} fw={500}>
        LexiLift
      </Text>
    </Flex>
  );
};
