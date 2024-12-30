import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Discipline, DisciplineState } from "../../types/types";
import { extractErrorMessage } from "../../utils/extactErrorMessage";

const API_URL = import.meta.env.VITE_API_URL + "disciplines";

const initialState: DisciplineState = {
  disciplines: [],
  isLoading: false,
  error: null,
  edit: null,
};

// Fetch all disciplines
export const fetchDisciplines = createAsyncThunk(
  "disciplines/fetchAll",
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

// Create a new discipline
export const createDiscipline = createAsyncThunk(
  "disciplines/create",
  async (
    discipline: Omit<Discipline, "_id" | "createdAt" | "updatedAt">,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(API_URL, discipline, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Update an existing discipline
export const updateDiscipline = createAsyncThunk(
  "disciplines/update",
  async (
    { id, updates }: { id: string; updates: Partial<Discipline> },
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

// Delete a discipline
export const deleteDiscipline = createAsyncThunk(
  "disciplines/delete",
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

const disciplineSlice = createSlice({
  name: "disciplines",
  initialState,
  reducers: {
    setEditDiscipline(state, action: PayloadAction<Discipline | null>) {
      state.edit = action.payload;
    },
    clearEditDiscipline(state) {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDisciplines.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDisciplines.fulfilled, (state, action) => {
      state.isLoading = false;
      state.disciplines = action.payload;
    });
    builder.addCase(fetchDisciplines.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(createDiscipline.fulfilled, (state, action) => {
      state.disciplines.push(action.payload);
    });

    builder.addCase(updateDiscipline.fulfilled, (state, action) => {
      state.disciplines = state.disciplines.map((d) =>
        d._id === action.payload._id ? action.payload : d
      );
      state.edit = null;
    });

    builder.addCase(deleteDiscipline.fulfilled, (state, action) => {
      state.disciplines = state.disciplines.filter(
        (d) => d._id !== action.meta.arg
      );
      if (state.edit?._id === action.meta.arg) {
        state.edit = null;
      }
    });
  },
});

export const { setEditDiscipline, clearEditDiscipline } =
  disciplineSlice.actions;

export default disciplineSlice.reducer;
