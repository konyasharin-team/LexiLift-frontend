import { FC } from 'react';
import { useI18N } from '@i18n';
import { Flex, Paper, Textarea, TextInput } from '@mantine/core';
import { TagsInput } from '@modules/tags';
import { useEditModule } from '@modules/vocabularyModule';
import { EditModuleElementAnimator } from '@modules/vocabularyModule/components/EditModuleElementAnimator';

export const EditModuleInfo: FC<
  Pick<ReturnType<typeof useEditModule>, 'addTag' | 'removeTag' | 'form'>
> = props => {
  const { t } = useI18N();

  return (
    <EditModuleElementAnimator>
      <Flex justify="space-between" gap={20}>
        <Flex direction="column" w="50%">
          <Paper shadow="md">
            <TextInput
              placeholder={t.createModulePage.moduleName}
              className="text"
              {...props.form.getInputProps('title')}
            />
          </Paper>

          <div>
            <Paper shadow="md">
              <TagsInput
                tags={props.form.values.tags}
                addTag={props.addTag}
                removeTag={props.removeTag}
                className={'text'}
              />
            </Paper>
          </div>
        </Flex>
        <Paper shadow="md" w="50%">
          <Textarea
            placeholder={t.createModulePage.description}
            h="100%"
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
    </EditModuleElementAnimator>
  );
};
