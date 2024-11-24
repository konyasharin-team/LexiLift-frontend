import { IModuleApi } from '@modules/vocabularyModule/types/IModuleApi.ts';

export type PutModuleBody = Pick<IModuleApi, 'title' | 'description'>;
