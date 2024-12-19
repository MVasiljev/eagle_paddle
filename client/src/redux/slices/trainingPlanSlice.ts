import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { extractErrorMessage } from "../../utils/extactErrorMessage";
import { TrainingPlanState, TrainingPlan } from "../../types/types";

const API_URL =
  import.meta.env.VITE_API_URL + "training-plans" ||
  "http://localhost:5002/api/training-plans";

const initialState: TrainingPlanState = {
  plans: [],
  loading: false,
  error: null,
};

// Fetch all training plans
export const fetchTrainingPlans = createAsyncThunk(
  "trainingPlans/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      console.log("fetchTrainingPlans called");
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Fetch a single training plan by ID
export const fetchTrainingPlanById = createAsyncThunk(
  "trainingPlans/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Save a new training plan
export const saveTrainingPlan = createAsyncThunk(
  "trainingPlans/save",
  async (plan: TrainingPlan, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, plan, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Update a training plan
export const updateTrainingPlan = createAsyncThunk(
  "trainingPlans/update",
  async (
    { id, updates }: { id: string; updates: Partial<TrainingPlan> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updates, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Delete a training plan
export const deleteTrainingPlan = createAsyncThunk(
  "trainingPlans/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return id;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Slice
const trainingPlanSlice = createSlice({
  name: "trainingPlans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Plans
      .addCase(fetchTrainingPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainingPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchTrainingPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Plan By ID
      .addCase(fetchTrainingPlanById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrainingPlanById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.plans.findIndex(
          (plan) => plan._id === action.payload._id
        );
        if (index === -1) state.plans.push(action.payload);
      })
      .addCase(fetchTrainingPlanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Save Plan
      .addCase(saveTrainingPlan.fulfilled, (state, action) => {
        state.plans.push(action.payload);
      })
      .addCase(saveTrainingPlan.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Update Plan
      .addCase(updateTrainingPlan.fulfilled, (state, action) => {
        const index = state.plans.findIndex(
          (plan) => plan._id === action.payload._id
        );
        if (index !== -1) state.plans[index] = action.payload;
      })
      .addCase(updateTrainingPlan.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Delete Plan
      .addCase(deleteTrainingPlan.fulfilled, (state, action) => {
        state.plans = state.plans.filter((plan) => plan._id !== action.payload);
      })
      .addCase(deleteTrainingPlan.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default trainingPlanSlice.reducer;
