import { FolderSchemaInfer } from '@modules/folders';

export type CreateFolderBody = Pick<FolderSchemaInfer, 'title' | 'description'>;
