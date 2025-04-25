import { FC, ReactNode } from 'react';
import { transformPages } from '@api';
import { List } from '@components/List';
import { Center } from '@mantine/core';
import {
  ModuleSchemaInfer,
  useGetModulesUserController,
} from '@modules/vocabularyModule';

import { moduleFromBackendFieldsTransform } from '../../utils';
import { ModulesListElement } from '../ModulesListElement';

interface IModulesListProps {
  withinChoose?: boolean;
  modules?: ModuleSchemaInfer[];
  getModulesUserController?: ReturnType<typeof useGetModulesUserController>;
  controls?: (id: ModuleSchemaInfer['id']) => ReactNode[];
}

export const ModulesList: FC<IModulesListProps> = props => {
  const getIsEmpty = () => {
    if (props.getModulesUserController) {
      const sender = props.getModulesUserController.sender;
      if (sender.data?.pages.length)
        return !sender.data?.pages[0].data.result?.content.length;
      return false;
    }
    return !props.modules?.length;
  };

  return !getIsEmpty() ? (
    <List span={3} height={150}>
      {props.getModulesUserController
        ? transformPages(props.getModulesUserController.sender, page => {
            return page.data.result?.content.map((module, index) => (
              <ModulesListElement
                index={index}
                key={module.id}
                withinChoose={props.withinChoose}
                controls={props.controls?.(module.id)}
                {...module}
                {...moduleFromBackendFieldsTransform(module)}
              />
            ));
          })
        : props.modules?.map((module, index) => (
            <ModulesListElement
              index={index}
              key={module.id}
              withinChoose={props.withinChoose}
              controls={props.controls?.(module.id)}
              {...module}
            />
          ))}
    </List>
  ) : (
    <Center h={500}>Нет модулей</Center>
  );
};
