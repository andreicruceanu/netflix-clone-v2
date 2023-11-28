import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import RankSvg from "./RankSvg";
import tmdbConfig from "../../api/configs/tmdb.configs.js";
import { Link } from "react-router-dom";

const MediaItemTop = ({ index, media }) => {
  const [posterPath, setPosterPath] = useState("");

  useEffect(() => {
    setPosterPath(media.poster_path);
  }, [media]);
  return (
    <Box
      component={Link}
      to={"/"}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "translateY(-10px)",
        },
      }}
    >
      <Box sx={{ width: "45%", display: "flex", alignItems: "center" }}>
        <RankSvg numberIcon={index} />
      </Box>
      <Box sx={{ width: "55%", display: "flex", alignItems: "center" }}>
        <Box
          component="img"
          width="100%"
          height="100%"
          src={tmdbConfig.posterPath(posterPath)}
          alt="poza"
        />
      </Box>
    </Box>
  );
};

export default MediaItemTop;
