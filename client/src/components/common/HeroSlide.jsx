import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getRandomNumber } from "../../utils/function";
import {
  setGenresMovieSlice,
  setGenresSeriesSlice,
} from "../../redux/features/genresStateSlice";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import mediaApi from "../../api/modules/media.api";
import genreApi from "../../api/modules/genre.api";
import Player from "video.js";
import NetflixIconButton from "./NetflixIconButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import MaxLineTypography from "./MaxLineTypography";
import VideoJSPlayer from "./watch/VideoJSPlayer";
import MaturityRate from "./MaturityRate";
import PlayButton from "./PlayButton";
import MoreInfoButton from "./MoreInfoButton";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const dispatch = useDispatch();
  const playerRef = useRef(Player);
  const [muted, setMuted] = useState(true);
  const [movieHero, setMovieHero] = useState({});

  const maturityRate = useMemo(() => {
    return getRandomNumber(12, 17);
  }, []);

  useEffect(() => {
    const getMediaHero = async () => {
      const { response, err } = await mediaApi.heroMedia({
        mediaType,
        mediaCategory,
      });
      if (response) {
        setMovieHero(response);
      }
      if (err) {
        toast.error(err.message);
      }
      dispatch(setGlobalLoading(false));
    };

    const getGenresMovie = async () => {
      dispatch(setGlobalLoading(true));

      const { response, err } = await genreApi.getList({ mediaType });

      if (response) {
        dispatch(setGenresMovieSlice(response.genres));
        getMediaHero();
      }
      if (err) {
        toast.error(err.message);
      }
    };
    getGenresMovie();
  }, [mediaType, mediaCategory, dispatch]);

  useEffect(() => {
    const getGenresSeries = async () => {
      const { response, err } = await genreApi.getList({ mediaType: "tv" });

      if (response) {
        dispatch(setGenresSeriesSlice(response.genres));
      }
      if (err) {
        console.log(err);
      }
    };
    getGenresSeries();
  }, [mediaType, mediaCategory, dispatch]);

  const handleReady = (player) => {
    playerRef.current = player;
  };
  const handleMute = (status) => {
    if (playerRef.current) {
      playerRef.current.muted(!status);
      setMuted(!status);
    }
  };

  return (
    <Box sx={{ position: "relative", zIndex: 1 }}>
      <Box
        sx={{
          mb: 3,
          pb: "40%",
          top: 0,
          left: 0,
          right: 0,
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "56.25vw",
            position: "absolute",
          }}
        >
          {movieHero && (
            <>
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  position: "absolute",
                }}
              >
                {movieHero.officialTrailer && (
                  <VideoJSPlayer
                    options={{
                      loop: true,
                      muted: true,
                      autoplay: true,
                      controls: false,
                      responsive: true,
                      fluid: true,
                      techOrder: ["youtube"],
                      sources: [
                        {
                          type: "video/youtube",
                          src: `https://www.youtube.com/watch?v=${
                            movieHero.officialTrailer?.key || "L3oOldViIgY"
                          }`,
                        },
                      ],
                    }}
                    onReady={handleReady}
                  />
                )}
                <Box
                  sx={{
                    background: `linear-gradient(77deg,rgba(0,0,0,0),transparent 85%)`,
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: "26.09%",
                    opacity: 1,
                    position: "absolute",
                    transition: "opacity .5s",
                  }}
                />
                <Box
                  sx={{
                    backgroundColor: "transparent",
                    backgroundImage:
                      "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#070707 68%,#010101)",
                    backgroundRepeat: "repeat-x",
                    backgroundPosition: "0px top",
                    backgroundSize: "100% 100%",
                    bottom: 0,
                    position: "absolute",
                    height: "14.7vw",
                    opacity: 1,
                    top: "auto",
                    width: "100%",
                  }}
                />
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    alignItems: "center",
                    position: "absolute",
                    right: 0,
                    bottom: "35%",
                  }}
                >
                  <NetflixIconButton
                    size="large"
                    onClick={() => handleMute(muted)}
                    sx={{ zIndex: 2 }}
                  >
                    {!muted ? <VolumeUpIcon /> : <VolumeOffIcon />}
                  </NetflixIconButton>
                  <MaturityRate>{`${maturityRate}+`}</MaturityRate>
                </Stack>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <Stack
                  spacing={4}
                  sx={{
                    bottom: "35%",
                    position: "absolute",
                    left: { xs: "4%", md: "60px" },
                    top: 0,
                    width: "36%",
                    zIndex: 10,
                    justifyContent: "flex-end",
                  }}
                >
                  <MaxLineTypography
                    variant="h2"
                    maxLine={1}
                    color="text.primary"
                  >
                    {movieHero.title}
                  </MaxLineTypography>
                  <MaxLineTypography
                    variant="h5"
                    maxLine={3}
                    color="text.primary"
                  >
                    {movieHero.overview}
                  </MaxLineTypography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <PlayButton size="large" />
                    <MoreInfoButton size="large" />
                  </Stack>
                </Stack>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSlide;
