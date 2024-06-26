import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./features/userSlice";
import themeModeSlice from "./features/themeModeSlice";
import authModalSlice from "./features/authModalSlice";
import appStateSlice from "./features/appStateSlice";
import genresSlice from "./features/genresStateSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import infoModalSlice from "./features/infoModal";

const store = configureStore({
  reducer: {
    user: userSlice,
    themeMode: themeModeSlice,
    authModal: authModalSlice,
    appState: appStateSlice,
    genres: genresSlice,
    globalLoading: globalLoadingSlice,
    infoModal: infoModalSlice,
  },
});
export default store;
