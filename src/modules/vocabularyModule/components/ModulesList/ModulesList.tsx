import { FC } from 'react';
import { transformPages } from '@api';
import { List } from '@components/List';
import { Center } from '@mantine/core';
import { useGetModulesUserController } from '@modules/vocabularyModule';

import { moduleFromBackendFieldsTransform } from '../../utils';
import { ModulesListElement } from '../ModulesListElement';

interface IModulesListProps {
  getModulesUserController: ReturnType<typeof useGetModulesUserController>;
}

export const ModulesList: FC<IModulesListProps> = props => {
  const getIsEmpty = () => {
    const sender = props.getModulesUserController.sender;
    if (sender.data?.pages.length)
      return !sender.data?.pages[0].data.result?.content.length;
    return false;
  };

  return !getIsEmpty() ? (
    <List span={3} height={150}>
      {transformPages(props.getModulesUserController.sender, page => {
        return page.data.result?.content.map((module, index) => (
          <ModulesListElement
            index={index}
            key={module.id}
            {...module}
            {...moduleFromBackendFieldsTransform(module)}
          />
        ));
      })}
    </List>
  ) : (
    <Center h={500}>Нет модулей</Center>
  );
};
