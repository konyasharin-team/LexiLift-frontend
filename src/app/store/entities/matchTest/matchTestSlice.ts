import { DictionaryItemSchemaInfer, ITestSettings } from '@app-types';
import { IMatchTestResults } from '@modules/matchTest';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  cards: DictionaryItemSchemaInfer[];
  settings: ITestSettings | null;
  results: IMatchTestResults | null;
}

const initialState: IState = {
  settings: null,
  results: null,
  cards: [],
};

export const matchTestSlice = createSlice({
  name: 'matchTest',
  initialState,
  reducers: {
    setMatchTestSettings: (state, action: PayloadAction<ITestSettings>) => {
      state.settings = action.payload;
    },
    setMatchTestResults: (state, action: PayloadAction<IMatchTestResults>) => {
      state.results = action.payload;
    },
    setMatchTestCards: (
      state,
      action: PayloadAction<DictionaryItemSchemaInfer[]>,
    ) => {
      state.cards = action.payload;
    },
  },
});
