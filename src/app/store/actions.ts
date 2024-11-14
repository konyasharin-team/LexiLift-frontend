import { authActions } from '@store/entities/auth';
import { matchTestActions } from '@store/entities/matchTest';

export const actions = {
  ...authActions,
  ...matchTestActions,
};
