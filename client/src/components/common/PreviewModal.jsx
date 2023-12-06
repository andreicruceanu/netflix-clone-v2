import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs.js";
import ButtonCard from "./ButtonCard";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useSelector } from "react-redux";
import ButtonFavorite from "./ButtonFavorite";
//
import MoreInfoModal from "./MoreInfoModal";
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
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChipNetflix from "./ChipNetflix";
import GenreBreadcrumbs from "./GenreBreadcrumbs";
import Preferences from "./Preferences.jsx";

const MediaVideo = ({ mediaType, mediaId, posterPath }) => {
  const [onReadyVideo, setOnReadyVideo] = useState(true);

  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    if (mediaType && mediaId) {
      const getTrailer = async () => {
        const { response, err } = await mediaApi.getTrailer({
          mediaType,
          mediaId,
        });
        if (response && response.data !== "") {
          setTrailer(response);
        }
        if (err) {
          toast.error(err.message);
        }
      };
      getTrailer();
    }
  }, [mediaType, mediaId]);

  return (
    <>
      {trailer && onReadyVideo ? (
        <Box
          sx={{
            overflow: "hidden",
            width: "100%",

            aspectRatio: "16/9",
            pointerEvents: "none",
          }}
        >
          <iframe
            style={{ width: "100%", height: "100%" }}
            src={tmdbConfigs.youtubePath(trailer.key)}
            title={trailer.name}
          ></iframe>
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "50%",
            borderRadius: "8px 8px 0px 0px",
            ...uiConfigs.style.backgroundImage(posterPath),
          }}
        />
      )}
    </>
  );
};

const PreviewModal = ({ media, mediaType, anchorElement }) => {
  console.log(media);
  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [rate, setRate] = useState(null);
  const [genreId, setGenreId] = useState([]);
  const { genresMovie } = useSelector((state) => state.genres);
  const { genresSeries } = useSelector((state) => state.genres);

  const navigate = useNavigate();
  useEffect(() => {
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
    setReleaseDate(
      getReleaseYear(mediaType, media?.release_date || media?.first_air_date)
    );
    setRate(media.vote_average || media.mediaRate);
  }, [media, mediaType]);

  const [isModalOpen, setIsModalOpen] = useState({
    trailerModal: false,
    moreDetails: false,
  });
  const handleOpenModal = (modalName) => {
    setIsModalOpen({ ...isModalOpen, [modalName]: true });
  };
  const onClose = (modalName) => {
    setIsModalOpen({ ...isModalOpen, [modalName]: false });
  };

  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* <TrailerVideo
        open={isModalOpen.trailerModal}
        onClose={() => onClose("trailerModal")}
        mediaType={mediaType}
        mediaId={media.id}
      /> */}
      <MoreInfoModal
        open={isModalOpen.moreDetails}
        onClose={() => onClose("moreDetails")}
        mediaType={mediaType}
        mediaId={media.id}
      />

      <Card
        sx={{
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
              <NetflixIconButton onClick={() => handleOpenModal("moreDetails")}>
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

export default PreviewModal;
