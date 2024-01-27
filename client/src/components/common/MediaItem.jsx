import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs.js";
import PreviewModal from "./PreviewModal";
import { routesGen } from "../../routes/routes.jsx";
import DefaultNoImgMovie from "../../assets/images/no-poster.png";
import VideoItemWithHover from "./VideoItemWithHover.jsx";

const MediaItem = ({ media, mediaType }) => {
  return (
    <>
      <VideoItemWithHover media={media} mediaType={mediaType} />
    </>
  );
};

export default MediaItem;
