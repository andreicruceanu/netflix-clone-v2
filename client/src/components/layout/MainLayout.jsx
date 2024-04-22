import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchProvider } from "../context/SearchContext";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import {
  setListFavorite,
  setListPreferences,
  setUser,
} from "../../redux/features/userSlice";

import GlobalLoading from "../common/GlobalLoading";
import Topbar from "../common/Topbar";
import AuthModal from "../common/AuthModal";
import userApi from "../../api/modules/user.api";
import preferencesApi from "../../api/modules/preferences.api";
import favoriteApi from "../../api/modules/favorite.api";
import Footer from "../common/Footer";
import PortalProvider from "../provider/PortalProvider";
import VideoPortalContainer from "../common/VideoPortalContainer";
import InfoModal from "../common/InfoModal";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();
      if (response) {
        dispatch(setUser(response));
      }
      if (err) {
        dispatch(setUser(null));
      }
    };
    authUser();
  }, [dispatch]);

  useEffect(() => {
    const getPreferences = async () => {
      const { response, err } = await preferencesApi.getPreferences();
      if (response) {
        dispatch(setListPreferences(response));
      }
      if (err) {
        dispatch(setListPreferences([]));
      }
    };
    if (user) getPreferences();
  }, [user, dispatch]);

  useEffect(() => {
    const getFavorites = async () => {
      const { response, err } = await favoriteApi.getList();
      if (response) {
        dispatch(setListFavorite(response));
      }
      if (err) toast.error(err.message);
    };
    if (user) getFavorites();
    if (!user) dispatch(setListFavorite([]));
  }, [user, dispatch]);

  return (
    <>
      <SearchProvider>
        <GlobalLoading />
        <AuthModal />
        <InfoModal />
        <Box display="flex" minHeight="100vh">
          {/* Header */}
          <Topbar />
          {/* Header */}

          {/* main */}
          <Box
            component="main"
            flexGrow={1}
            overflow="hidden"
            minHeight="100vh"
          >
            <PortalProvider>
              <Outlet />
              <VideoPortalContainer />
            </PortalProvider>
          </Box>

          {/* main */}
        </Box>
        <Footer />
      </SearchProvider>
    </>
  );
};

export default MainLayout;
