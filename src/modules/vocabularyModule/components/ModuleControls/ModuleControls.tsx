import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { pendingToLoading, useRequestEvents } from '@api';
import { MergedGroup } from '@components/MergedGroup';
import { useNotifications } from '@hooks';
import { useI18N } from '@i18n';
import { ActionIcon, Flex } from '@mantine/core';
import {
  ModuleSchemaInfer,
  useDeleteModuleController,
} from '@modules/vocabularyModule';
import { appPaths } from '@routes';
import { IconEdit, IconTrash } from '@tabler/icons-react';

export const ModuleControls: FC<Pick<ModuleSchemaInfer, 'id'>> = props => {
  const deleteController = useDeleteModuleController();
  const { t } = useI18N();
  const navigate = useNavigate();

  useNotifications([
    {
      type: 'error',
      on: deleteController.sender.isError,
      message: t.modulePage.deleteError,
    },
    {
      message: t.modulePage.deleteSuccess,
      on: deleteController.sender.isSuccess,
      type: 'success',
    },
  ]);

  useRequestEvents(pendingToLoading(deleteController.sender), {
    onSuccess: () => navigate(appPaths.MODULES),
  });

  return (
    <Flex h={'100%'} w={'100%'} justify={'flex-end'}>
      <MergedGroup elementWidth={64} elementHeight={40}>
        <ActionIcon variant={'subtle'}>
          <IconEdit />
        </ActionIcon>
        <ActionIcon
          variant={'subtle'}
          loading={deleteController.sender.isPending}
          onClick={() => {
            deleteController.sender.mutate({ id: props.id });
          }}
        >
          <IconTrash />
        </ActionIcon>
      </MergedGroup>
    </Flex>
  );
};
