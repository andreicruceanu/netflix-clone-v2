import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs.js";
import ButtonCard from "./ButtonCard";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import ButtonFavorite from "./ButtonFavorite";
//
import MoreInfoModal from "./InfoModal.jsx";
import mediaApi from "../../api/modules/media.api";
import { toast } from "react-toastify";
import {
  formatMinuteToReadable,
  getRandomNumber,
  getRandomSeasons,
  getReleaseYear,
} from "../../utils/function";
import MaxLineTypography from "./MaxLineTypography";
import NetflixIconButton from "./NetflixIconButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ChipNetflix from "./ChipNetflix";
import GenreBreadcrumbs from "./GenreBreadcrumbs";
import Preferences from "./Preferences.jsx";
import { usePortal } from "../provider/PortalProvider.jsx";
import { setOpenModal } from "../../redux/features/infoModal.js";

const VideoCardPortal = ({ media, mediaType, anchorElement }) => {
  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [genreId, setGenreId] = useState([]);
  const [mediaId, setMediaId] = useState(undefined);
  const { genresMovie } = useSelector((state) => state.genres);
  const { genresSeries } = useSelector((state) => state.genres);
  const rect = anchorElement.getBoundingClientRect();
  const setPortal = usePortal();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    setMediaId(media.id);
    setTitle(media.title || media.name || media.mediaTitle);
    setGenreId(media.genre_ids);
    setPosterPath(
      tmdbConfigs.posterPath(
        media.poster_path ||
          media.backdrop_path ||
          media.mediaPoster ||
          media.profile_path
      )
    );
  }, [media, mediaType]);

  return (
    <>
      <Card
        onPointerLeave={() => {
          setPortal(null, null);
        }}
        sx={{
          width: rect.width * 1.2,
          height: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            position: "relative",
            paddingTop: "calc(9 / 16 * 100%)",
          }}
        >
          <img
            src={`${tmdbConfigs.backdropPath(posterPath)}`}
            alt={title}
            style={{
              top: 0,
              height: "100%",
              width: "100%",
              objectFit: "cover",
              position: "absolute",
              backgroundPosition: "50%",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              left: 0,
              right: 0,
              bottom: 0,
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingBottom: "4px",
              position: "absolute",
            }}
          >
            <MaxLineTypography
              maxLine={2}
              sx={{ width: "80%", fontWeight: 700 }}
              variant="h6"
            >
              {media.title}
            </MaxLineTypography>
            <div style={{ flexGrow: 1 }} />
            <NetflixIconButton>
              <VolumeUpIcon />
            </NetflixIconButton>
          </div>
        </div>
        <CardContent>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1}>
              <NetflixIconButton sx={{ p: 0 }} onClick={() => navigate(`/`)}>
                <PlayCircleIcon sx={{ width: 40, height: 40 }} />
              </NetflixIconButton>
              <NetflixIconButton>
                <ButtonFavorite mediaType={mediaType} media={media} />
              </NetflixIconButton>
              <Preferences mediaType={mediaType} mediaId={media.id} />
              <div style={{ flexGrow: 1 }} />
              <NetflixIconButton
                onClick={() => dispatch(setOpenModal({ mediaId, mediaType }))}
              >
                <ExpandMoreIcon />
              </NetflixIconButton>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="subtitle1"
                sx={{ color: "success.main" }}
              >{`${getRandomNumber(50, 100)}% Match`}</Typography>
              <ChipNetflix label={`${getRandomNumber(9, 17)}+`} />
              <Typography variant="subtitle2">
                {mediaType === tmdbConfigs.mediaType.movie
                  ? `${formatMinuteToReadable(getRandomNumber(90, 160))}`
                  : getRandomSeasons(6)}
              </Typography>
            </Stack>
            <GenreBreadcrumbs
              genres={
                mediaType === "movie" && genresMovie
                  ? genresMovie
                      .filter((genres) => genreId.includes(genres.id))
                      .map((genre) => genre.name)
                  : mediaType === "tv" && genresSeries
                  ? genresSeries
                      .filter((genres) => genreId.includes(genres.id))
                      .map((genre) => genre.name)
                  : ""
              }
            />
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default VideoCardPortal;
