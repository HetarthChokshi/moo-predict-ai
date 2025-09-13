import { configureStore } from '@reduxjs/toolkit';
import animalsSlice from './slices/animalsSlice';
import predictionsSlice from './slices/predictionsSlice';
import diseasesSlice from './slices/diseasesSlice';
import feedSlice from './slices/feedSlice';
import uiSlice from './slices/uiSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    animals: animalsSlice,
    predictions: predictionsSlice,
    diseases: diseasesSlice,
    feed: feedSlice,
    ui: uiSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;