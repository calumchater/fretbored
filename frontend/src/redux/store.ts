import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './quizSlice';
import selectedNotesReducer from './selectedNotesSlice';

export const store = configureStore({
  reducer: {
    quizInfo: quizReducer,
    selectedNotes: selectedNotesReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
