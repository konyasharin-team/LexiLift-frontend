import { FC } from 'react';
import { useI18N } from '@i18n';
import { Flex, Text, Title } from '@mantine/core';
import { appColors } from '@themes';

import { FolderSchemaInfer } from '../../types/FolderSchema';

interface IFolderHeadProps
  extends Pick<FolderSchemaInfer, 'title' | 'description'> {
  modulesCount: number;
}

export const FolderHead: FC<IFolderHeadProps> = props => {
  const { t } = useI18N();

  return (
    <Flex direction={'column'} gap={20}>
      <Flex direction={'column'} gap={2}>
        <Title order={2}>{props.title}</Title>
        <Text c={appColors.greyApp[5]}>
          {t.folderPage.modulesCount}: {props.modulesCount}
        </Text>
      </Flex>
      <Text>{props.description}</Text>
    </Flex>
  );
};
