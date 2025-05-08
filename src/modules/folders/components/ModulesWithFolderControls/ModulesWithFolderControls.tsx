import { FC } from 'react';
import { FeedLoadMarker } from '@components/FeedLoadMarker';
import { ActionIcon, Flex } from '@mantine/core';
import {
  ModuleSchemaInfer,
  ModulesList,
  useGetModulesUserController,
} from '@modules/vocabularyModule';

interface IModulesWithFolderControlsProps {
  onAdd: (id: ModuleSchemaInfer['id']) => void;
  onRemove: (id: ModuleSchemaInfer['id']) => void;
  activeModules: ModuleSchemaInfer['id'][];
}

export const ModulesWithFolderControls: FC<
  IModulesWithFolderControlsProps
> = props => {
  const controller = useGetModulesUserController();

  const getIsActiveControl = (id: ModuleSchemaInfer['id']) => {
    return props.activeModules.some(other => other === id);
  };

  const renderControl = (
    id: ModuleSchemaInfer['id'],
    variant: 'add' | 'remove',
  ) => {
    if (variant === 'add')
      return (
        <ActionIcon
          key={'add'}
          onClick={() => props.onAdd(id)}
          variant={'filled'}
          disabled={getIsActiveControl(id)}
        >
          +
        </ActionIcon>
      );

    return (
      <ActionIcon
        key={'remove'}
        color={'red'}
        onClick={() => props.onRemove(id)}
        variant={'filled'}
        disabled={!getIsActiveControl(id)}
      >
        -
      </ActionIcon>
    );
  };

  return (
    <Flex direction={'column'} gap={20}>
      <ModulesList
        getModulesUserController={controller}
        withinChoose={true}
        controls={id => [renderControl(id, 'add'), renderControl(id, 'remove')]}
      />
      <FeedLoadMarker sender={controller.sender} />
    </Flex>
  );
};
