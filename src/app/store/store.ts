import { authSlice } from '@modules/authorization';
import { layoutSlice } from '@modules/layout';
import { configureStore } from '@reduxjs/toolkit';
import { matchTestSlice } from '@store/entities/matchTest/matchTestSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    matchTest: matchTestSlice.reducer,
    layout: layoutSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
