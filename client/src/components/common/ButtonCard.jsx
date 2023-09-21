import { Box } from "@mui/material";
import React from "react";

const ButtonCard = ({ background, children }) => {
  return (
    <Box
      sx={{
        width: "2rem",
        height: "2rem",
        border: "1px solid white",
        background: background ? background : "",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }}
    >
      {children}
    </Box>
  );
};

export default ButtonCard;
