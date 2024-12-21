import { FC } from 'react';
import { transformPages } from '@api';
import { List } from '@components/List';
import { useGetModulesUserController } from '@modules/vocabularyModule';
import { ModulesListElement } from '@modules/vocabularyModule/components/ModulesListElement/ModulesListElement.tsx';
import { moduleBackendTransform } from '@modules/vocabularyModule/utils/moduleBackendTransform.ts';

interface IModulesListProps {
  getModulesUserController: ReturnType<typeof useGetModulesUserController>;
}

export const ModulesList: FC<IModulesListProps> = props => {
  return (
    <List span={3} height={150}>
      {transformPages(props.getModulesUserController.sender, page => {
        return page.data.result?.content.map((module, index) => (
          <ModulesListElement
            index={index}
            key={module.id}
            {...moduleBackendTransform(module)}
          />
        ));
      })}
    </List>
  );
};
