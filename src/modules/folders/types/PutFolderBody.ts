import { FolderSchemaInfer } from '@modules/folders';

export type PutFolderBody = Pick<FolderSchemaInfer, 'title' | 'description'>;
