import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { extractErrorMessage } from "../../utils/extactErrorMessage";
import { TrainingSessionState, TrainingSession } from "../../types/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002/api"; // Adjust the API URL

const initialState: TrainingSessionState = {
  list: [],
  status: "idle",
  error: null,
};

// Async Thunks
export const fetchTrainingSessions = createAsyncThunk(
  "trainingSessions/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}training-sessions`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const createTrainingSession = createAsyncThunk(
  "trainingSessions/create",
  async (session: TrainingSession, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}training-sessions`,
        session,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const updateTrainingSession = createAsyncThunk(
  "trainingSessions/update",
  async (
    { id, updates }: { id: string; updates: Partial<TrainingSession> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}training-sessions/${id}`,
        updates,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const deleteTrainingSession = createAsyncThunk(
  "trainingSessions/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}training-sessions/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return id;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const assignPlanToCompetitors = createAsyncThunk(
  "trainingSessions/assignPlan",
  async (
    data: {
      planId: string;
      competitorIds: string[];
      date: string;
      iteration: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}training-sessions/assign-plan`,
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const updateTrainingSessionResults = createAsyncThunk(
  "trainingSessions/updateResults",
  async (
    { id, results }: { id: string; results: Record<string, unknown> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}training-sessions/${id}/results`,
        { results },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const fetchMyTrainingSessions = createAsyncThunk(
  "trainingSessions/fetchMy",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching my training sessions...");
      const response = await axios.get(`${API_URL}training-sessions/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("[Training] Fetched my training sessions:", response.data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Slice
const trainingSessionSlice = createSlice({
  name: "trainingSessions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainingSessions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrainingSessions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchTrainingSessions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(createTrainingSession.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteTrainingSession.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (session) => session._id !== action.payload
        );
      })
      .addCase(updateTrainingSession.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (session) => session._id === action.payload._id
        );
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(assignPlanToCompetitors.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(assignPlanToCompetitors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload; // Use returned sessions array
      })
      .addCase(assignPlanToCompetitors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateTrainingSessionResults.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (session) => session._id === action.payload._id
        );
        if (index !== -1) state.list[index] = action.payload;
      })
      // Fetch my training sessions
      .addCase(fetchMyTrainingSessions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyTrainingSessions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchMyTrainingSessions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default trainingSessionSlice.reducer;
