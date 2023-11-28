import { Chip } from "@mui/material";
import React from "react";

const ChipNetflix = ({ sx, ...others }) => {
  return (
    <Chip
      variant="outlined"
      {...others}
      sx={{
        borderRadius: "4px",
        p: 0.5,
        fontSize: 12,
        height: "100%",
        "& > span": { p: 0 },
        ...sx,
      }}
    />
  );
};

export default ChipNetflix;
