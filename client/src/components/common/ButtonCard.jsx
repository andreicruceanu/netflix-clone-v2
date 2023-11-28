import { Box } from "@mui/material";
import React from "react";

const ButtonCard = ({ background, children }) => {
  return (
    <Box
      sx={{
        width: "3rem",
        height: "3rem",
        border: "2px solid grey",
        background: background ? background : "rgba(255, 255, 255, 0.1)",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        transition: "0.3s ease",
        "&:hover": {
          border: "2px solid white",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default ButtonCard;
