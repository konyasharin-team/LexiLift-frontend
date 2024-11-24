import { IId } from '@api';

export interface IModuleApi extends IId {
  title: string;
  description: string;
  owner: number;
}
