import { FC } from 'react';
import { FeedLoadMarker } from '@components/FeedLoadMarker';
import { Flex } from '@mantine/core';
import {
  CreateModuleButton,
  ModulesList,
  useModulesRequests,
} from '@modules/vocabularyModule';

export const ModulesListPage: FC = () => {
  const { controllers } = useModulesRequests();
  return (
    <Flex gap={20} direction={'column'}>
      <CreateModuleButton />
      <ModulesList
        getModulesUserController={controllers.getModulesUserController}
      />
      <FeedLoadMarker
        onView={controllers.getModulesUserController.sender.fetchNextPage}
      />
    </Flex>
  );
};
