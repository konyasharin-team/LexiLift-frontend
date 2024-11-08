import { ITestSettings } from '@app-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  settings: ITestSettings | null;
}

const initialState: IState = {
  settings: null,
};

export const matchTestSlice = createSlice({
  name: 'matchTest',
  initialState,
  reducers: {
    setMatchTestSettings: (state, action: PayloadAction<ITestSettings>) => {
      state.settings = action.payload;
    },
  },
});
