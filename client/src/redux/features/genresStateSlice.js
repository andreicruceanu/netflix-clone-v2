import { createSlice } from "@reduxjs/toolkit";

export const genresSlice = createSlice({
  name: "genres",
  initialState: {
    genres: [],
  },
  reducers: {
    setGenresSlice: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { setGenresSlice } = genresSlice.actions;

export default genresSlice.reducer;
