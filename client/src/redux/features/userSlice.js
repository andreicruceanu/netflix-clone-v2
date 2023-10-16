import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    listFavorites: [],
  },
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload);
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
    addFavorite: (state, action) => {
      state.listFavorites = [action.payload, ...state.listFavorites];
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
