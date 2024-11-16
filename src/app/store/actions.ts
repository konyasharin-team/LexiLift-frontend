import { authActions } from '@store/entities/auth';
import { layoutActions } from '@store/entities/layout';
import { matchTestActions } from '@store/entities/matchTest';

export const actions = {
  ...authActions,
  ...matchTestActions,
  ...layoutActions,
};
