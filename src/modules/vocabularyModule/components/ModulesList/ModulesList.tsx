import { FC } from 'react';
import { Flex } from '@mantine/core';
import { useModulesRequests } from '@modules/vocabularyModule';
import { ModulesListElement } from '@modules/vocabularyModule/components/ModulesListElement/ModulesListElement.tsx';

interface IModulesListProps {
  getModulesUserController: ReturnType<
    typeof useModulesRequests
  >['controllers']['getModulesUserController'];
}

export const ModulesList: FC<IModulesListProps> = props => {
  return (
    <Flex justify="center" direction="column" gap="md">
      {props.getModulesUserController.sender.response
        ? props.getModulesUserController.sender.response.data.result?.map(
            (module, index) => (
              <ModulesListElement
                key={index}
                title={module.title}
                description={module.description}
                tags={[]}
              />
            ),
          )
        : undefined}
    </Flex>
  );
};
