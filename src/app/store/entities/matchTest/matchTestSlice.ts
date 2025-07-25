import { MatchTestResults, MatchTestSettings } from '@modules/matchTest';
import { ModuleSchemaInfer } from '@modules/vocabularyModule';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  module: ModuleSchemaInfer | null;
  settings: MatchTestSettings | null;
  results: MatchTestResults | null;
}

const initialState: IState = {
  settings: null,
  results: null,
  module: null,
};

export const matchTestSlice = createSlice({
  name: 'matchTest',
  initialState,
  reducers: {
    setMatchTestSettings: (state, action: PayloadAction<MatchTestSettings>) => {
      state.settings = action.payload;
    },
    setMatchTestResults: (state, action: PayloadAction<MatchTestResults>) => {
      state.results = action.payload;
    },
    setMatchTestModule: (
      state,
      action: PayloadAction<ModuleSchemaInfer | null>,
    ) => {
      state.module = action.payload;
    },
  },
});
