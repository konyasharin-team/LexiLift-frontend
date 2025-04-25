import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItem } from '@components/List';
import { Flex, Text } from '@mantine/core';
import { FolderSchemaInfer } from '@modules/folders';
import { generators } from '@routes';

interface IFoldersListElement extends FolderSchemaInfer {
  index: number;
}

export const FoldersListElement = forwardRef<
  HTMLDivElement,
  IFoldersListElement
>((props, ref) => {
  const navigate = useNavigate();
  return (
    <ListItem
      ref={ref}
      index={props.index}
      onSelect={() => navigate(generators.FOLDERS_GENERATORS.FOLDER(props.id))}
    >
      <Flex direction={'column'} justify={'space-between'} h={'100%'}>
        <div>
          <Text size="lg">{props.title}</Text>
          <Text size="sm" mt="xs">
            {props.description}
          </Text>
        </div>
      </Flex>
    </ListItem>
  );
});
