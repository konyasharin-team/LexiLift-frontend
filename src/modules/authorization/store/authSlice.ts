import { TokensSchemaInfer } from '@modules/authorization/types/TokensSchema.ts';
import { UserSchemaInfer } from '@modules/authorization/types/UserSchema.ts';
import { TokensService } from '@modules/authorization/utils/TokensService.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  user: UserSchemaInfer | null;
  tokens: TokensSchemaInfer;
}

const initialState: IState = {
  user: null,
  tokens: TokensService.GetTokens(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserSchemaInfer>) => {
      state.user = action.payload;
    },
    setTokens: (state, action: PayloadAction<TokensSchemaInfer>) => {
      state.tokens = action.payload;
      TokensService.SetTokens(action.payload);
    },
  },
});
