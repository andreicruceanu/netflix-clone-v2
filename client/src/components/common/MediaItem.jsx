import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs.js";
import PreviewModal from "./PreviewModal";
import { routesGen } from "../../routes/routes.jsx";
import DefaultNoImgMovie from "../../assets/images/no-poster.png";

const MediaItem = ({ media, mediaType }) => {
  const [posterPath, setPosterPath] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setPosterPath(
      tmdbConfigs.posterPath(
        media.poster_path ||
          media.backdrop_path ||
          media.mediaPoster ||
          media.profile_path
      )
    );
  }, [media, mediaType]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleRemoveHover = () => {
    setIsHovered(false);
  };

  return (
    <>
      {/* {isHovered && <PreviewModal media={media} mediaType={mediaType} />} */}

      <Box
        className="card"
        onMouseEnter={handleMouseEnter}
        sx={{
          width: "100%",
          height: "165px",
          position: "relative",
          cursor: "pointer",
        }}
      >
        <Box
          component={Link}
          to={
            mediaType !== "people"
              ? routesGen.mediaDetail(mediaType, media.mediaId || media.id)
              : routesGen.person(media.id)
          }
          sx={{ display: "block", width: "100%", height: "100%" }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              ...uiConfigs.style.backgroundImage(posterPath),
              borderRadius: "5px",
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default MediaItem;
