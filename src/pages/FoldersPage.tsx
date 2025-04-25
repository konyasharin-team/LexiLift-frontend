import { FC } from 'react';
import { FeedLoadMarker } from '@components/FeedLoadMarker';
import { Flex } from '@mantine/core';
import {
  CreateFolderButton,
  FoldersList,
  useGetFoldersUserController,
} from '@modules/folders';

export const FoldersPage: FC = () => {
  const controller = useGetFoldersUserController();
  return (
    <Flex gap={20} direction={'column'}>
      <CreateFolderButton />
      <FoldersList getFoldersUserController={controller} />
      <FeedLoadMarker sender={controller.sender} />
    </Flex>
  );
};
