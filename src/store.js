import { configureStore } from '@reduxjs/toolkit';
import { absenceApi } from './services/absenceSlice';

export const store = configureStore({
  reducer: {
    [absenceApi?.reducerPath]: absenceApi?.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(absenceApi?.middleware),
});
