import { layoutSlice } from '@modules/layout/store/layoutSlice.ts';

export * from './layoutSlice';

export const layoutActions = {
  ...layoutSlice.actions,
};
