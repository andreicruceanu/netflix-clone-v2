import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalLoading from "../common/GlobalLoading";
import { Box } from "@mui/material";
import Topbar from "../common/Topbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const dispatch = useDispatch((state) => state.user);

  return (
    <>
      <GlobalLoading />

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
