import { IDictionaryCard } from '@app-types';

export interface IUseModuleCard extends Omit<IDictionaryCard, 'id'> {
  imageUploaded: boolean;
}
