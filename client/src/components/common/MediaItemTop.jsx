import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import RankSvg from "./RankSvg";
import tmdbConfig from "../../api/configs/tmdb.configs.js";
import { Link } from "react-router-dom";
import { routesGen } from "../../routes/routes.jsx";

const MediaItemTop = ({ index, media }) => {
  const [posterPath, setPosterPath] = useState("");

  useEffect(() => {
    setPosterPath(media.poster_path || media.backdrop_path);
  }, [media]);

  return (
    <Box>
      <Box
        component={Link}
        to={routesGen.mediaDetail(media.media_type, media.id)}
        sx={{ display: "block" }}
      >
        <Box
          sx={{
            height: 0,
            overflow: "hidden",
            padding: "35.7% 0",
            position: "relative",
            width: "100%",
            borderRadius: "2px",
          }}
        >
          <Box
            sx={{
              border: "1px solid transparent",
              margin: "0 -1px",
              overflow: "visible",
              transform: "scale(1)",
              bottom: 0,
              left: 0,
              position: "absolute",
              right: "auto",
              top: 0,
              width: "50%",
            }}
          >
            <RankSvg
              numberIcon={index}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
          <img
            style={{
              left: "auto",
              bottom: 0,
              top: 0,
              right: "10px",
              width: "50%",
              position: "absolute",
              height: "100%",
              objectFit: "cover",
            }}
            src={tmdbConfig.posterPath(posterPath)}
            alt="Img media"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MediaItemTop;
