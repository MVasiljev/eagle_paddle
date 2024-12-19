import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import roleReducer from "./slices/roleSlice";
import trainingPlanSlice from "./slices/trainingPlanSlice";
import traininSessionSlice from "./slices/trainingSessionSlice";
import teamSlice from "./slices/teamSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
    user: userReducer,
    trainingPlan: trainingPlanSlice,
    trainingSession: traininSessionSlice,
    teams: teamSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, // Disable ImmutableStateInvariantMiddleware
      serializableCheck: false, // Disable SerializableStateInvariantMiddleware
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
