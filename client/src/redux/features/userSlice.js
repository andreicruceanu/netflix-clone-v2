import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    listFavorites: [],
    listLikedMovies: [],
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem("jwt_token");
      } else {
        if (action.payload.token) {
          localStorage.setItem("jwt_token", action.payload.token);
        }
      }
      state.user = action.payload;
    },
    setListFavorite: (state, action) => {
      state.listFavorites = action.payload;
    },
    setListLikedMovies: (state, action) => {
      state.listLikedMovies = action.payload;
    },
    addFavorite: (state, action) => {
      state.listFavorites = [action.payload, ...state.listFavorites];
    },
    addLikedMovies: (state, action) => {
      state.listLikedMovies = [action.payload, ...state.listLikedMovies];
    },
    removeFavorite: (state, action) => {
      const { mediaId } = action.payload;
      state.listFavorites = [...state.listFavorites].filter(
        (movie) => movie.mediaId.toString() !== mediaId.toString()
      );
    },
  },
});

export const { setUser, setListFavorite, removeFavorite, addFavorite } =
  userSlice.actions;

export default userSlice.reducer;
