import { authActions } from '@modules/authorization';
import { layoutActions } from '@store/entities/layout';
import { matchTestActions } from '@store/entities/matchTest';

export const actions = {
  ...authActions,
  ...matchTestActions,
  ...layoutActions,
};
