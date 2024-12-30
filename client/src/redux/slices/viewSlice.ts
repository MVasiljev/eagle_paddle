// src/redux/slices/viewSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ViewState {
  view: string; // Current view name
  selectedCompetitorId: string | null; // Selected competitor ID
  selectedCoachId: string | null; // Selected coach ID
}

const initialState: ViewState = {
  view: "competitors", // Default view
  selectedCompetitorId: null, // No competitor selected
  selectedCoachId: null, // No coach selected
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setView(state, action: PayloadAction<string>) {
      state.view = action.payload;
    },
    setSelectedCompetitorId(state, action: PayloadAction<string | null>) {
      state.selectedCompetitorId = action.payload;
    },
    setSelectedCoachId(state, action: PayloadAction<string | null>) {
      state.selectedCoachId = action.payload;
    },
  },
});

export const { setView, setSelectedCompetitorId, setSelectedCoachId } =
  viewSlice.actions;
export default viewSlice.reducer;
