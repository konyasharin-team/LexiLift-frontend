import { useNavigate } from 'react-router-dom';
import { pendingToLoading, useMutation, useRequestEvents } from '@api';
import { useI18N } from '@i18n';
import { FolderSchema } from '@modules/folders';
import { FoldersApi } from '@modules/folders/api/FoldersApi.ts';
import { FoldersErrorSchema } from '@modules/folders/types/FoldersErrorSchema.ts';
import { generators } from '@routes';
import { notify } from '@utils';

export const useCreateFolderController = () => {
  const { t } = useI18N();
  const navigate = useNavigate();

  const createFolderController = useMutation(
    {
      mutationFn: FoldersApi.PostFolder.bind(FoldersApi),
    },
    {
      resultSchema: FolderSchema,
      errorSchema: FoldersErrorSchema,
    },
  );

  useRequestEvents(pendingToLoading(createFolderController.sender), {
    onSuccess: result => {
      if (result) {
        notify({
          type: 'success',
          message: t.createFolderPage.createdSuccess,
        });
        navigate(generators.FOLDERS_GENERATORS.EDIT_FOLDER(result?.id));
      }
    },
  });

  return {
    ...createFolderController,
  };
};
