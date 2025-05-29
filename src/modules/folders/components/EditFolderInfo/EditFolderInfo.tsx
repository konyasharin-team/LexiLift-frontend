import { FC } from 'react';
import { useI18N } from '@i18n';
import { Flex, Paper, Textarea, TextInput } from '@mantine/core';

import { useEditFolderForm } from '../../hooks/useEditFolderForm';

interface IEditFolderInfoProps {
  form: ReturnType<typeof useEditFolderForm>['form'];
}

export const EditFolderInfo: FC<IEditFolderInfoProps> = props => {
  const { t } = useI18N();

  return (
    <Flex direction={'column'} gap={20}>
      <Paper shadow="md">
        <TextInput
          placeholder={t.createFolderPage.folderName}
          className="text"
          {...props.form.getInputProps('title')}
        />
      </Paper>
      <Paper shadow="md">
        <Textarea
          placeholder={t.createFolderPage.description}
          h={100}
          className="text"
          styles={{
            wrapper: {
              height: '100%',
            },
            input: {
              height: '100%',
            },
          }}
          {...props.form.getInputProps('description')}
        />
      </Paper>
    </Flex>
  );
};
