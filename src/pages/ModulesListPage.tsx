import { FC } from 'react';
import { Flex } from '@mantine/core';
import {
  CreateModuleButton,
  ModulesList,
  useModulesRequests,
} from '@modules/vocabularyModule';

export const ModulesListPage: FC = () => {
  const { page, setPage, controllers } = useModulesRequests();
  return (
    <Flex gap={20} direction={'column'}>
      <ModulesList
        getModulesUserController={controllers.getModulesUserController}
      />
      <CreateModuleButton />
    </Flex>
  );
};
