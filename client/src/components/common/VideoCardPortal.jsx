import { Card, CardContent, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import ButtonFavorite from "./ButtonFavorite";
import MaxLineTypography from "./MaxLineTypography";
import NetflixIconButton from "./NetflixIconButton";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ChipNetflix from "./ChipNetflix";
import GenreBreadcrumbs from "./GenreBreadcrumbs";
import Preferences from "./Preferences.jsx";
import { usePortal } from "../provider/PortalProvider.jsx";
import { setOpenModal } from "../../redux/features/infoModal.js";
import { routesGen } from "../../routes/routes.jsx";
import { useRandom } from "../../hook/useRandom.jsx";

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

  console.log(media);
  const navigate = useNavigate();
  useEffect(() => {
    setMediaId(media.id);
    setTitle(media.title || media.name || media.original_name);
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

  const { randomMatch, randomAge, randomDuration } = useRandom(mediaType);

  console.log(mediaId, mediaType);

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
              sx={{ width: "80%", fontWeight: 700, mb: 0.5 }}
              variant="h6"
            >
              {title}
            </MaxLineTypography>
          </div>
        </div>
        <CardContent>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1}>
              <NetflixIconButton
                sx={{ p: 0 }}
                onClick={() =>
                  navigate(routesGen.mediaDetail(mediaType, mediaId))
                }
              >
                <PlayCircleIcon sx={{ width: 50, height: 50 }} />
              </NetflixIconButton>
              <NetflixIconButton sx={{ p: 0 }}>
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
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mt: "12px !important" }}
            >
              <Typography variant="subtitle1" sx={{ color: "success.main" }}>
                {randomMatch}
              </Typography>
              <ChipNetflix label={randomAge} />
              <Typography variant="subtitle2">{randomDuration}</Typography>
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
