import { LearnTestResults, LearnTestSettings } from '@modules/learnTest';
import { ModuleSchemaInfer } from '@modules/vocabularyModule';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  module: ModuleSchemaInfer | null;
  settings: LearnTestSettings | null;
  results: LearnTestResults | null;
}

const initialState: IState = {
  settings: null,
  results: null,
  module: null,
};

export const learnTestSlice = createSlice({
  name: 'learnTest',
  initialState,
  reducers: {
    setLearnTestSettings: (state, action: PayloadAction<LearnTestSettings>) => {
      state.settings = action.payload;
    },
    setLearnTestResults: (state, action: PayloadAction<LearnTestResults>) => {
      state.results = action.payload;
    },
    setLearnTestModule: (
      state,
      action: PayloadAction<ModuleSchemaInfer | null>,
    ) => {
      state.module = action.payload;
    },
  },
});
