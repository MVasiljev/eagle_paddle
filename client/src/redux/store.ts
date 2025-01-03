import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import roleReducer from "./slices/roleSlice";
import trainingPlanSlice from "./slices/trainingPlanSlice";
import traininSessionSlice from "./slices/trainingSessionSlice";
import teamSlice from "./slices/teamSlice";
import viewReducer from "./slices/viewSlice";
import clubReducer from "./slices/clubSlice";
import boatReducer from "./slices/boatSlice";
import mentalHealthReducer from "./slices/mentalHealthSlice";
import disciplineReducer from "./slices/disciplineSlice";
import trainingTypeSlice from "./slices/trainingTypeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
    user: userReducer,
    trainingPlan: trainingPlanSlice,
    trainingSession: traininSessionSlice,
    teams: teamSlice,
    dashboard: viewReducer,
    clubs: clubReducer,
    boats: boatReducer,
    mentalHealth: mentalHealthReducer,
    disciplines: disciplineReducer,
    trainingTypes: trainingTypeSlice,
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
