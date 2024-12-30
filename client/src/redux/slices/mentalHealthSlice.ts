import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { MentalHealthState, MentalHealthEntry } from "../../types/types";
import { extractErrorMessage } from "../../utils/extactErrorMessage";

const API_URL = import.meta.env.VITE_API_URL + "mental-health";

const initialState: MentalHealthState = {
  entries: [],
  myEntries: [],
  isLoading: false,
  error: null,
  edit: null,
};

// Fetch all mental health entries (Admin or Manager Level)
export const fetchMentalHealthEntries = createAsyncThunk(
  "mentalHealth/fetchAll",
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

// Fetch mental health records for the logged-in user
export const fetchMyMentalHealthEntries = createAsyncThunk(
  "mentalHealth/fetchMy",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/my`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Add a new mental health entry
export const createMentalHealthEntry = createAsyncThunk(
  "mentalHealth/create",
  async (entry: Partial<MentalHealthEntry>, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, entry, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Update an existing mental health entry
export const updateMentalHealthEntry = createAsyncThunk(
  "mentalHealth/update",
  async (
    { id, updates }: { id: string; updates: Partial<MentalHealthEntry> },
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

export const deleteMentalHealthEntry = createAsyncThunk(
  "mentalHealth/delete",
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
const mentalHealthSlice = createSlice({
  name: "mentalHealth",
  initialState,
  reducers: {
    setEditMentalHealth(
      state,
      action: PayloadAction<MentalHealthEntry | null>
    ) {
      state.edit = action.payload;
    },
    clearEditMentalHealth(state) {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all entries (Admin or Manager Level)
    builder.addCase(fetchMentalHealthEntries.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMentalHealthEntries.fulfilled, (state, action) => {
      state.isLoading = false;
      state.entries = action.payload;
    });
    builder.addCase(fetchMentalHealthEntries.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch logged-in user's personal records
    builder.addCase(fetchMyMentalHealthEntries.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMyMentalHealthEntries.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myEntries = action.payload; // Populate myEntries
    });
    builder.addCase(fetchMyMentalHealthEntries.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Create new entry (add to both entries and myEntries)
    builder.addCase(createMentalHealthEntry.fulfilled, (state, action) => {
      state.isLoading = false;
      state.entries.push(action.payload); // Admin list
      state.myEntries.push(action.payload); // User list (self-created)
    });

    // Delete handler
    builder.addCase(deleteMentalHealthEntry.fulfilled, (state, action) => {
      state.entries = state.entries.filter(
        (entry) => entry._id !== action.payload
      );
      state.myEntries = state.myEntries.filter(
        (entry) => entry._id !== action.payload
      );
    });

    // Update existing entry
    builder.addCase(updateMentalHealthEntry.fulfilled, (state, action) => {
      state.isLoading = false;

      // Update admin (entries) list
      state.entries = state.entries.map((entry) =>
        entry._id === action.payload._id ? action.payload : entry
      );

      // Update personal list if applicable
      state.myEntries = state.myEntries.map((entry) =>
        entry._id === action.payload._id ? action.payload : entry
      );

      // Clear edit state after update
      state.edit = null;
    });
  },
});

export const { setEditMentalHealth, clearEditMentalHealth } =
  mentalHealthSlice.actions;
export default mentalHealthSlice.reducer;
