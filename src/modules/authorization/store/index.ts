import { authSlice } from './authSlice.ts';

export * from './authSlice.ts';
export const authActions = {
  ...authSlice.actions,
};
