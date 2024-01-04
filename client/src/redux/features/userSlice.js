import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    listFavorites: [],
    listPreferences: [],
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
    setListPreferences: (state, action) => {
      state.listPreferences = action.payload;
    },
    removePreference: (state, action) => {
      const { mediaId } = action.payload;
      state.listPreferences = [...state.listPreferences].filter(
        (preference) => preference.mediaId.toString() !== mediaId.toString()
      );
    },
    addFavorite: (state, action) => {
      state.listFavorites = [action.payload, ...state.listFavorites];
    },
    addPreference: (state, action) => {
      const existPreference = state.listPreferences.find(
        (item) => item.id === action.payload.id
      );
      if (existPreference) {
        state.listPreferences = state.listPreferences.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      } else {
        state.listPreferences = [action.payload, ...state.listPreferences];
      }
    },
    removeFavorite: (state, action) => {
      const { id } = action.payload;
      state.listFavorites = [...state.listFavorites].filter(
        (movie) => movie.id.toString() !== id.toString()
      );
    },
  },
});

export const {
  setUser,
  setListFavorite,
  removeFavorite,
  addFavorite,
  setListPreferences,
  removePreference,
  addPreference,
} = userSlice.actions;

export default userSlice.reducer;
