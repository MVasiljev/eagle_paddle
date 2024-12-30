import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthState, RegisterUserData } from "../../types/types";
import { extractErrorMessage } from "../../utils/extactErrorMessage";

const API_URL =
  import.meta.env.VITE_API_URL + "auth" || "http://localhost:5000/api/auth";

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
  serverError: null,
  isRegistered: false,
};

// Register User
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterUserData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      const { token, user } = response.data;

      // Save token and user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("[Auth] Token stored:", token);
      console.log("[Auth] User stored:", user);

      return { token, user };
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      state.serverError = null;
      state.isRegistered = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    resetRegistration: (state) => {
      state.isRegistered = false; // Reset after showing success alert
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous error
        state.serverError = null;
        state.isRegistered = false; // Reset during new registration attempt
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isRegistered = true; // Mark registration as successful
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; // Store specific error
        state.isRegistered = false; // Ensure it's not marked successful
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous error
        state.serverError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; // Store specific error
      });
  },
});

export const { logout, resetRegistration } = authSlice.actions;

export default authSlice.reducer;
