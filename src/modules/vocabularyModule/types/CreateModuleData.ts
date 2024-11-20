import { IModule } from '@modules/vocabularyModule/types/IModule.ts';

export type CreateModuleData = Pick<IModule, 'title' | 'description'>;
