import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { pendingToLoading, useRequestEvents } from '@api';
import { MergedGroup } from '@components/MergedGroup';
import { useNotifications } from '@hooks';
import { useI18N } from '@i18n';
import { ActionIcon, Flex } from '@mantine/core';
import { FolderSchemaInfer, useDeleteFolderController } from '@modules/folders';
import { appPaths, generators } from '@routes';
import { IconEdit, IconTrash } from '@tabler/icons-react';

export const FolderControls: FC<Pick<FolderSchemaInfer, 'id'>> = props => {
  const deleteController = useDeleteFolderController();
  const { t } = useI18N();
  const navigate = useNavigate();

  useNotifications([
    {
      type: 'error',
      on: deleteController.sender.isError,
      message: t.folderPage.deleteError,
    },
    {
      message: t.folderPage.deleteSuccess,
      on: deleteController.sender.isSuccess,
      type: 'success',
    },
  ]);

  useRequestEvents(pendingToLoading(deleteController.sender), {
    onSuccess: () => navigate(appPaths.FOLDERS),
  });

  return (
    <Flex h={'100%'} w={'100%'} justify={'flex-end'}>
      <MergedGroup elementWidth={64} elementHeight={40}>
        <ActionIcon
          variant={'subtle'}
          onClick={() =>
            navigate(generators.FOLDERS_GENERATORS.EDIT_FOLDER(props.id))
          }
        >
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
