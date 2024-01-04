import { Chip } from "@mui/material";
import React from "react";

const Genres = ({ data }) => {
  return [...data].map((genre, index) => (
    <Chip
      variant="filled"
      color="primary"
      size="small"
      sx={{ mr: 1, mt: 1, borderRadius: "5px" }}
      key={index}
      label={genre.name}
    />
  ));
};

export default Genres;
