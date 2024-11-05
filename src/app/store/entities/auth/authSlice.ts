import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Roles } from '@constants/Roles';

interface IUser {
  role: keyof typeof Roles;
}

interface IState {
  user: IUser | null;
}

const initialState: IState = {
  user: { role: Roles.user },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});
