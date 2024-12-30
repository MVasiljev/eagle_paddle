import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IClub, ClubState } from "../../types/types";
import { extractErrorMessage } from "../../utils/extactErrorMessage";

const API_URL = import.meta.env.VITE_API_URL + "clubs";

const initialState: ClubState = {
  clubs: [],
  isLoading: false,
  edit: null, // Edit state to track club being edited
  error: null,
};

// Fetch all clubs
export const fetchClubs = createAsyncThunk(
  "clubs/fetchAll",
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

// Fetch club by ID
export const fetchClubById = createAsyncThunk(
  "clubs/fetchById",
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

// Create a new club
export const createClub = createAsyncThunk(
  "clubs/create",
  async (
    club: Omit<IClub, "_id" | "createdAt" | "updatedAt">,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(API_URL, club, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Update an existing club
export const updateClub = createAsyncThunk(
  "clubs/update",
  async (
    { id, updates }: { id: string; updates: Partial<IClub> },
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

// Delete a club
export const deleteClub = createAsyncThunk(
  "clubs/delete",
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

const clubSlice = createSlice({
  name: "clubs",
  initialState,
  reducers: {
    setEditClub(state, action: PayloadAction<IClub | null>) {
      state.edit = action.payload;
    },
    clearEditClub(state) {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all clubs
    builder.addCase(fetchClubs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchClubs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.clubs = action.payload;
    });
    builder.addCase(fetchClubs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch single club by ID
    builder.addCase(fetchClubById.fulfilled, (state, action) => {
      state.edit = action.payload; // Set the club to edit
    });

    // Create Club
    builder.addCase(createClub.fulfilled, (state, action) => {
      state.clubs.push(action.payload);
    });

    // Update Club
    builder.addCase(updateClub.fulfilled, (state, action) => {
      const index = state.clubs.findIndex(
        (club) => club._id === action.payload._id
      );
      if (index !== -1) {
        state.clubs[index] = action.payload;
      }
      if (state.edit && state.edit._id === action.payload._id) {
        state.edit = action.payload;
      }
    });

    // Delete Club
    builder.addCase(deleteClub.fulfilled, (state, action) => {
      state.clubs = state.clubs.filter(
        (club) => club._id !== action.payload._id
      );
      if (state.edit && state.edit._id === action.payload._id) {
        state.edit = null;
      }
    });
  },
});

export const { setEditClub, clearEditClub } = clubSlice.actions;

export default clubSlice.reducer;
