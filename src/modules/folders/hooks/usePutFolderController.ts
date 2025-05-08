import { IdSchemaInfer, useMutation } from '@api';
import { useNotifications } from '@hooks';
import { useI18N } from '@i18n';
import { FoldersApi } from '@modules/folders/api/FoldersApi.ts';
import { FoldersErrorSchema } from '@modules/folders/types/FoldersErrorSchema.ts';

import { PutFolderBody } from '../types/PutFolderBody';

export const usePutFolderController = () => {
  const { t } = useI18N();
  const controller = useMutation(
    {
      mutationFn: (data: PutFolderBody & IdSchemaInfer) =>
        FoldersApi.PutFolder({ ...data }, { id: data.id }),
    },
    { errorSchema: FoldersErrorSchema },
  );

  useNotifications([
    {
      on: controller.sender.isSuccess,
      type: 'success',
      message: t.folderPage.updatedSuccess,
    },
    {
      on: controller.sender.isError,
      type: 'error',
      message: t.folderPage.updatedError,
    },
  ]);

  return {
    ...controller,
  };
};
