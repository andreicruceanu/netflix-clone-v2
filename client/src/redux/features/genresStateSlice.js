import { createSlice } from "@reduxjs/toolkit";

export const genresSlice = createSlice({
  name: "genres",
  initialState: {
    genresMovie: [],
    genresSeries: [],
  },
  reducers: {
    setGenresMovieSlice: (state, action) => {
      state.genresMovie = action.payload;
    },
    setGenresSeriesSlice: (state, action) => {
      state.genresSeries = action.payload;
    },
  },
});

export const { setGenresMovieSlice, setGenresSeriesSlice } =
  genresSlice.actions;

export default genresSlice.reducer;
