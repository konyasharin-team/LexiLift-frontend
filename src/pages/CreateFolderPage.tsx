import { FC } from 'react';
import { useI18N } from '@i18n';
import {
  EditFolderInfo,
  EditFolderWrapper,
  useCreateFolderController,
  useEditFolderForm,
} from '@modules/folders';

export const CreateFolderPage: FC = () => {
  const controller = useCreateFolderController();
  const { form } = useEditFolderForm();
  const { t } = useI18N();

  return (
    <EditFolderWrapper
      form={form}
      sendText={t.createFolderPage.createFolder}
      onSubmit={controller.sender.mutate}
      loading={controller.sender.isPending}
    >
      <EditFolderInfo form={form} />
    </EditFolderWrapper>
  );
};
