import { FC } from 'react';
import { transformPages } from '@api';
import { List } from '@components/List';
import { Center } from '@mantine/core';
import { useGetFoldersUserController } from '@modules/folders';

import { FoldersListElement } from '../FoldersListElement';

interface IFoldersListProps {
  getFoldersUserController: ReturnType<typeof useGetFoldersUserController>;
}

export const FoldersList: FC<IFoldersListProps> = props => {
  const getIsEmpty = () => {
    const sender = props.getFoldersUserController.sender;
    if (sender.data?.pages.length)
      return !sender.data?.pages[0].data.result?.content.length;
    return false;
  };

  return !getIsEmpty() ? (
    <List span={3} height={150}>
      {transformPages(props.getFoldersUserController.sender, page => {
        return page.data.result?.content.map((folder, index) => (
          <FoldersListElement index={index} key={folder.id} {...folder} />
        ));
      })}
    </List>
  ) : (
    <Center h={500}>Нет папок</Center>
  );
};
