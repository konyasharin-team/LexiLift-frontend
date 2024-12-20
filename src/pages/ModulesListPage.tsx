import { FC } from 'react';
import { FeedLoadMarker } from '@components/FeedLoadMarker';
import { Flex } from '@mantine/core';
import {
  CreateModuleButton,
  ModulesList,
  useGetModulesUserController,
} from '@modules/vocabularyModule';

export const ModulesListPage: FC = () => {
  const controller = useGetModulesUserController();
  return (
    <Flex gap={20} direction={'column'}>
      <CreateModuleButton />
      <ModulesList getModulesUserController={controller} />
      <FeedLoadMarker sender={controller.sender} />
    </Flex>
  );
};
