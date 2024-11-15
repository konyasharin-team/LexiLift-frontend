import { FC } from 'react';
import { Center, Text } from '@mantine/core';

export const NotFoundPage: FC = () => {
  return (
    <Center mt={200}>
      <Text fw={700} fz={36} tt={'uppercase'}>
        Страница не найдена
      </Text>
    </Center>
  );
};
