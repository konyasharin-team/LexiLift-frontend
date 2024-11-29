import { authActions } from '@modules/authorization';
import { layoutActions } from '@modules/layout';
import { matchTestActions } from '@store/entities/matchTest';

export const actions = {
  ...authActions,
  ...matchTestActions,
  ...layoutActions,
};
