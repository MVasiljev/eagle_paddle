import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ITeam } from "../../types/types";
import { extractErrorMessage } from "../../utils/extactErrorMessage";

const API_URL =
  import.meta.env.VITE_API_URL + "teams" || "http://localhost:5000/api/teams";

interface TeamState {
  teams: ITeam[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TeamState = {
  teams: [],
  isLoading: false,
  error: null,
};

// Fetch all teams
export const fetchTeams = createAsyncThunk(
  "teams/fetchTeams",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token provided. Please log in.");

      const response = await axios.get(`${API_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data; // Array of teams
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Create a new team
export const createTeam = createAsyncThunk(
  "teams/createTeam",
  async (
    teamData: Omit<ITeam, "_id" | "createdAt" | "updatedAt">,
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token provided. Please log in.");

      const response = await axios.post(`${API_URL}`, teamData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data; // The newly created team
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Delete a team
export const deleteTeam = createAsyncThunk(
  "teams/deleteTeam",
  async (teamId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token provided. Please log in.");

      await axios.delete(`${API_URL}/${teamId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return teamId; // Return the deleted team's ID
    } catch (error: unknown) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    resetTeams: (state) => {
      state.teams = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createTeam.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teams.push(action.payload);
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTeam.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teams = state.teams.filter((team) => team._id !== action.payload);
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetTeams } = teamSlice.actions;

export default teamSlice.reducer;
