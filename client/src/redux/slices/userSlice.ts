import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UpdateUserData, UserState } from "../../types/types";
import { extractErrorMessage } from "../../utils/extactErrorMessage";

const API_URL =
  import.meta.env.VITE_API_URL + "users" ||
  "http://94.130.23.50:5002/api/users";

const initialState: UserState = {
  users: [],
  unapprovedUsers: [],
  user: null,
  isLoading: false,
  error: null,
  totalUsers: 0,
  totalPages: 0,
};

// Fetch paginated approved users
export const fetchApprovedUsers = createAsyncThunk(
  "users/fetchApproved",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Approved Users Response:", response.data); // Debug here
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Fetch unapproved users (admin-only)
export const fetchUnapprovedUsers = createAsyncThunk(
  "users/fetchUnapproved",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/unapproved`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("[User] Unapproved users fetched:", response.data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Fetch the authenticated user's details
export const fetchCurrentUser = createAsyncThunk(
  "users/fetchCurrent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("[User] Current user fetched:", response.data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Fetch a specific user's details
export const fetchUserById = createAsyncThunk(
  "users/fetchById",
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

// Update user details
export const updateUserDetails = createAsyncThunk(
  "users/update",
  async (
    params: { id: string; updates: UpdateUserData },
    { rejectWithValue }
  ) => {
    try {
      const { id, updates } = params;

      const response = await axios.put(`${API_URL}/${id}`, updates, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      console.log("[User] Updated:", response.data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Approve a user (admin-only)
export const approveUser = createAsyncThunk(
  "users/approve",
  async (
    params: { id: string; approved: boolean; roleId: string },
    { rejectWithValue }
  ) => {
    try {
      const { id, approved, roleId } = params;
      const response = await axios.put(
        `${API_URL}/${id}/approve`,
        { approved, roleId }, // Include roleId in the request body
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

// Soft delete a user
export const deleteUser = createAsyncThunk(
  "users/delete",
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

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch approved users
    builder.addCase(fetchApprovedUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchApprovedUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.data;
      state.totalUsers = action.payload.totalUsers;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(fetchApprovedUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch unapproved users
    builder.addCase(fetchUnapprovedUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchUnapprovedUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.unapprovedUsers = action.payload;
    });
    builder.addCase(fetchUnapprovedUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch current user
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Fetch user by ID
    builder.addCase(fetchUserById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Update user
    builder.addCase(updateUserDetails.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateUserDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      console.log("[User] Local storage updated:", action.payload);
    });
    builder.addCase(updateUserDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Approve user
    builder.addCase(approveUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(approveUser.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(approveUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { reset: resetUser } = userSlice.actions;

export default userSlice.reducer;
