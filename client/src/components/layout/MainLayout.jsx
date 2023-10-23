import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalLoading from "../common/GlobalLoading";
import { Box } from "@mui/material";
import Topbar from "../common/Topbar";
import { Outlet } from "react-router-dom";
import AuthModal from "../common/AuthModal";
import userApi from "../../api/modules/user.api";
import { setUser } from "../../redux/features/userSlice";

const MainLayout = () => {
  const dispatch = useDispatch();

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

  return (
    <>
      <GlobalLoading />
      <AuthModal />

      <Box display="flex" minHeight="100vh">
        {/* Header */}
        <Topbar />
        {/* Header */}

        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* main */}
      </Box>
    </>
  );
};

export default MainLayout;
