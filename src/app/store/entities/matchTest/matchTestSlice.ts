import { Answer } from '@components/Board/types/Answer.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { answersIsEqual } from '../../../utils';

interface IMatchTestSlice {
  errors: Answer[];
  success: Answer[];
}

const initialState: IMatchTestSlice = {
  errors: [],
  success: [],
};

export const matchTestSlice = createSlice({
  name: 'matchTest',
  initialState,
  reducers: {
    addMatchTestError: (state, action: PayloadAction<Answer>) => {
      state.errors = [...state.errors, action.payload];
    },
    removeMatchTestError: (state, action: PayloadAction<Answer>) => {
      state.errors = state.errors.filter(
        answer => !answersIsEqual(answer, action.payload),
      );
    },
    addMatchTestSuccess: (state, action: PayloadAction<Answer>) => {
      state.success = [...state.success, action.payload];
    },
    removeMatchTestSuccess: (state, action: PayloadAction<Answer>) => {
      state.success = state.success.filter(
        answer => !answersIsEqual(answer, action.payload),
      );
    },
  },
});
