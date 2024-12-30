import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TrainingType, TrainingTypeState } from "../../types/types";
import { extractErrorMessage } from "../../utils/extactErrorMessage";

const API_URL = import.meta.env.VITE_API_URL + "training-types";

const initialState: TrainingTypeState = {
  types: [],
  edit: null,
  isLoading: false,
  error: null,
};

// Fetch all training types
export const fetchTrainingTypes = createAsyncThunk(
  "trainingTypes/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Fetch a specific training type by ID
export const fetchTrainingTypeById = createAsyncThunk(
  "trainingTypes/fetchById",
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

// Create a new training type
export const createTrainingType = createAsyncThunk(
  "trainingTypes/create",
  async (
    trainingType: Omit<TrainingType, "_id" | "createdAt" | "updatedAt">,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(API_URL, trainingType, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Update an existing training type
export const updateTrainingType = createAsyncThunk(
  "trainingTypes/update",
  async (
    params: { id: string; updates: Partial<TrainingType> },
    { rejectWithValue }
  ) => {
    try {
      const { id, updates } = params;
      const response = await axios.put(`${API_URL}/${id}`, updates, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Delete a training type
export const deleteTrainingType = createAsyncThunk(
  "trainingTypes/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

const trainingTypeSlice = createSlice({
  name: "trainingTypes",
  initialState,
  reducers: {
    setEditType(state, action: PayloadAction<TrainingType | null>) {
      state.edit = action.payload;
    },
    clearEditType(state) {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all training types
    builder.addCase(fetchTrainingTypes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTrainingTypes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.types = action.payload;
    });
    builder.addCase(fetchTrainingTypes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch single training type
    builder.addCase(fetchTrainingTypeById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTrainingTypeById.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedTypes = state.types.map((type) =>
        type._id === action.payload._id ? action.payload : type
      );
      state.types = updatedTypes;

      // Set the fetched type for editing
      state.edit = action.payload;
    });
    builder.addCase(fetchTrainingTypeById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Create training type
    builder.addCase(createTrainingType.fulfilled, (state, action) => {
      state.types.push(action.payload);
    });

    // Update training type
    builder.addCase(updateTrainingType.fulfilled, (state, action) => {
      state.types = state.types.map((type) =>
        type._id === action.payload._id ? action.payload : type
      );

      // Clear edit state after successful update
      state.edit = null;
    });

    // Delete training type
    builder.addCase(deleteTrainingType.fulfilled, (state, action) => {
      state.types = state.types.filter((type) => type._id !== action.meta.arg);

      // Clear edit state if deleted item was being edited
      if (state.edit?._id === action.meta.arg) {
        state.edit = null;
      }
    });
  },
});

// Export the new actions
export const { setEditType, clearEditType } = trainingTypeSlice.actions;

export default trainingTypeSlice.reducer;
