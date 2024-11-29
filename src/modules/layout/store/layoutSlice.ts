import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  burgerIsActive: boolean;
  appLayoutIsActive: boolean;
  appLayoutIsInit: boolean;
  appLoadingIsActive: boolean;
  appError: string | null;
}

const initialState: IState = {
  burgerIsActive: false,
  appLayoutIsActive: false,
  appLayoutIsInit: false,
  appLoadingIsActive: false,
  appError: null,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setBurgerIsActive: (state, action: PayloadAction<boolean>) => {
      state.burgerIsActive = action.payload;
    },
    setAppLayoutIsActive: (state, action: PayloadAction<boolean>) => {
      state.appLayoutIsActive = action.payload;
      state.burgerIsActive = false;
    },
    setAppLayoutIsInit: (state, action: PayloadAction<boolean>) => {
      state.appLayoutIsInit = action.payload;
    },
    setAppError: (state, action: PayloadAction<string | null>) => {
      state.appError = action.payload;
    },
    setAppLoadingIsActive: (state, action: PayloadAction<boolean>) => {
      state.appLoadingIsActive = action.payload;
    },
  },
});
