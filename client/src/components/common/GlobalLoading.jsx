import React from "react";
import { Paper, Box, LinearProgress, Toolbar } from "@mui/material";
import Logo from "./Logo";

const GlobalLoading = () => {
  return (
    <>
      <Paper
        sx={{
          opacity: 0,
          pointerEvents: "none",
          transition: "all .3s ease",
          width: "100vw",
          height: "100vh",
          position: "fixed",
          zIndex: 999,
        }}
      >
        <Toolbar />
        <LinearProgress />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Logo />
        </Box>
      </Paper>
    </>
  );
};

export default GlobalLoading;
