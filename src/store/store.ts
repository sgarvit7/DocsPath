import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice'; 
import doctorReducer from './doctorSlice'; 

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    doctorOnboarding: doctorReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;