import { FC } from 'react';
import { useI18N } from '@i18n';
import { Flex, Text, Title } from '@mantine/core';
import { ModuleSchemaInfer } from '@modules/vocabularyModule/types/ModuleSchema.ts';
import { appColors } from '@themes';

interface IModuleHeadProps
  extends Pick<ModuleSchemaInfer, 'title' | 'description'> {
  countWords: number;
}

export const ModuleHead: FC<IModuleHeadProps> = props => {
  const { t } = useI18N();

  return (
    <Flex direction={'column'} gap={20}>
      <Flex direction={'column'} gap={2}>
        <Title order={2}>{props.title}</Title>
        <Text c={appColors.greyApp[5]}>
          {t.modulePage.wordsCount}: {props.countWords}
        </Text>
      </Flex>
      <Text>{props.description}</Text>
    </Flex>
  );
};
