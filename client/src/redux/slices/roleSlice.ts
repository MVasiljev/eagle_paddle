import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RoleState } from "../../types/types";
import { extractErrorMessage } from "../../utils/extactErrorMessage";

const API_URL =
  import.meta.env.VITE_API_URL + "roles" || "http://localhost:5000/api/roles";

const initialState: RoleState = {
  roles: [],
  isLoading: false,
  error: null,
};

// Fetch Roles
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token provided. Please log in.");

      const response = await axios.get(`${API_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Return full role objects
      console.log("[Role] Fetched roles:", response.data);
      localStorage.setItem("roles", JSON.stringify(response.data));

      return response.data; // Array of { _id, name, permissions }
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    reset: (state) => {
      state.roles = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { reset: resetRoles } = roleSlice.actions;

export default roleSlice.reducer;
