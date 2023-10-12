import { createSlice } from "@reduxjs/toolkit";

export const trailerModalSlice = createSlice({
  name: "trailerModal",
  initialState: {
    trailerModalOpen: false,
  },
  reducers: {
    setTrailerModalOpen: (state, action) => {
      state.trailerModalOpen = action.payload;
    },
  },
});

export const { setTrailerModalOpen } = trailerModalSlice.actions;

export default trailerModalSlice.reducer;
