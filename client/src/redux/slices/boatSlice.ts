import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Boat, BoatState } from "../../types/types";
import { extractErrorMessage } from "../../utils/extactErrorMessage";

const API_URL = import.meta.env.VITE_API_URL + "boats";

const initialState: BoatState = {
  boats: [],
  edit: null,
  isLoading: false,
  error: null,
};

// Fetch all boats
export const fetchBoats = createAsyncThunk(
  "boats/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Create a new boat
export const createBoat = createAsyncThunk(
  "boats/create",
  async (boat: Omit<Boat, "_id">, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, boat, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Update an existing boat
export const updateBoat = createAsyncThunk(
  "boats/update",
  async (
    { id, updates }: { id: string; updates: Partial<Boat> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updates, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Delete a boat
export const deleteBoat = createAsyncThunk(
  "boats/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

const boatSlice = createSlice({
  name: "boats",
  initialState,
  reducers: {
    setEditBoat(state, action: PayloadAction<Boat | null>) {
      state.edit = action.payload;
    },
    clearEditBoat(state) {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBoats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boats = action.payload;
    });
    builder.addCase(fetchBoats.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(createBoat.fulfilled, (state, action) => {
      state.boats.push(action.payload);
    });

    builder.addCase(updateBoat.fulfilled, (state, action) => {
      state.boats = state.boats.map((boat) =>
        boat._id === action.payload._id ? action.payload : boat
      );
      state.edit = null;
    });

    builder.addCase(deleteBoat.fulfilled, (state, action) => {
      state.boats = state.boats.filter((boat) => boat._id !== action.meta.arg);
      if (state.edit?._id === action.meta.arg) {
        state.edit = null;
      }
    });
  },
});

export const { setEditBoat, clearEditBoat } = boatSlice.actions;
export default boatSlice.reducer;
