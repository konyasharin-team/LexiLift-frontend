import { FC } from 'react';
import { transformPages } from '@api';
import { Flex } from '@mantine/core';
import { useGetModulesUserController } from '@modules/vocabularyModule';
import { ModulesListElement } from '@modules/vocabularyModule/components/ModulesListElement/ModulesListElement.tsx';

interface IModulesListProps {
  getModulesUserController: ReturnType<typeof useGetModulesUserController>;
}

export const ModulesList: FC<IModulesListProps> = props => {
  return (
    <Flex justify="center" direction="column" gap="md">
      {transformPages(props.getModulesUserController.sender, page => {
        return page.data.result?.map((module, index) => (
          <ModulesListElement
            key={index}
            title={module.title}
            description={module.description}
            tags={[]}
          />
        ));
      })}
    </Flex>
  );
};
