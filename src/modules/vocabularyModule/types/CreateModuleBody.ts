import { IModule } from '@modules/vocabularyModule/types/IModule.ts';

export type CreateModuleBody = Pick<IModule, 'title' | 'description'>;
