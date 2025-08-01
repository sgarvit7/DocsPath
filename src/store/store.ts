import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice'; 
import doctorReducer from './doctorSlice'; 
import selfREducer from './selfSlice';
import userReducer from "./userSlice";


// export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    doctorOnboarding: doctorReducer,
    selfOnboarding : selfREducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;