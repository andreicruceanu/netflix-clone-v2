import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Loading() {
  return (
    <Box
      sx={{
        flex: 1,
        position: "realtive",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50% , -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    </Box>
  );
}

export default Loading;
