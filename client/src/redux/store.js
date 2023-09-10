import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import themeModeSlice from "./features/themeModeSlice";
import authModalSlice from "./features/authModalSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    themeMode: themeModeSlice,
    authModal: authModalSlice,
  },
});
export default store;
