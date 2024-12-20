import { FC } from 'react';
import { Flex, Text, Title } from '@mantine/core';
import { ModuleSchemaInfer } from '@modules/vocabularyModule/types/ModuleSchema.ts';
import { appColors } from '@themes';

export const ModuleHead: FC<
  Pick<ModuleSchemaInfer, 'title' | 'description'>
> = props => {
  return (
    <Flex direction={'column'} gap={10}>
      <Flex gap={10} align={'center'}>
        <Title order={2}>{props.title}</Title>
        <Text c={appColors.greyApp[5]}>10 слов</Text>
      </Flex>
      <Text>{props.description}</Text>
    </Flex>
  );
};
