import { configureStore } from '@reduxjs/toolkit';
import jobSourcesReducer from './slices/jobSourcesSlice';
import jobSearchReducer from './slices/jobSearchSlice';
import dashboardReducer from './slices/dashboardSlice';
import jobResultsReducer from './slices/jobResultsSlice';

export const store = configureStore({
  reducer: {
    jobSources: jobSourcesReducer,
    jobSearch: jobSearchReducer,
    dashboard: dashboardReducer,
    jobResults: jobResultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
