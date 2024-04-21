import { useEffect, useMemo, useRef, useState } from "react";
import { configsApp } from "../../configs/configsApp";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { setOpenModal } from "../../redux/features/infoModal";
import { getRandomNumber, trailerPath } from "../../utils/function";
import { Box, Stack } from "@mui/material";
import { toast } from "react-toastify";

import mediaApi from "../../api/modules/media.api";
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
  const playerRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [movieHero, setMovieHero] = useState(null);
  const [errorLoading, setErrorLoading] = useState(null);

  console.log(movieHero);

  const { isOpen } = useSelector((state) => state.infoModal);

  const maturityRate = useMemo(() => {
    return getRandomNumber(12, 17);
  }, []);

  useEffect(() => {
    const getMediaHero = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.heroMedia({
        mediaType,
        mediaCategory,
      });
      if (response) {
        setMovieHero(response);
      }
      if (err) {
        setErrorLoading(true);
        toast.error(err.message);
      }
      dispatch(setGlobalLoading(false));
    };
    getMediaHero();
  }, [mediaType, mediaCategory, dispatch]);

  const handleReady = (player) => {
    playerRef.current = player;
    setMuted(player.muted());
  };
  const handleMute = (status) => {
    if (playerRef.current) {
      playerRef.current.muted(!status);
      setMuted(!status);
    }
  };

  const handleOpenInfoModal = () => {
    dispatch(setOpenModal({ mediaId: movieHero.id, mediaType }));
    playerRef.current.pause();
  };

  console.log(playerRef.current);

  useEffect(() => {
    if (isOpen && playerRef.current) {
      playerRef.current.pause();
    } else if (playerRef.current) {
      playerRef.current.play();
    }
  }, [isOpen, playerRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (playerRef.current) {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (scrollY > 800 && !playerRef.current.paused()) {
          console.log("a");
          playerRef.current.pause();
        } else {
          playerRef.current.play();
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (errorLoading) return;

  return (
    movieHero && (
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            mb: 3,
            pb: "58%",
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
                        autoplay: true,
                        controls: false,
                        responsive: true,
                        fluid: true,
                        techOrder: ["youtube"],
                        sources: [
                          {
                            type: configsApp.trailerSource,
                            src: trailerPath(movieHero.officialTrailer?.key),
                          },
                        ],
                      }}
                      onReady={handleReady}
                    />
                  )}
                  <Box
                    sx={{
                      background: `linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)`,
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
                      backgroundImage:
                        "linear-gradient(to top, #141414, rgba(20,20,20,0.1))",
                      backgroundSize: "100% 100%",
                      bottom: 0,
                      position: "absolute",
                      height: "14.7vw",
                      opacity: 1,

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
                      sx={{ zIndex: 2, padding: 1.6 }}
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
                      {movieHero.title || movieHero.name}
                    </MaxLineTypography>
                    <MaxLineTypography
                      variant="h5"
                      maxLine={3}
                      color="text.primary"
                    >
                      {movieHero.overview}
                    </MaxLineTypography>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <PlayButton
                        size="large"
                        mediaId={movieHero.id}
                        mediaType={mediaType}
                      />
                      <MoreInfoButton
                        size="large"
                        onClick={() => handleOpenInfoModal()}
                      />
                    </Stack>
                  </Stack>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    )
  );
};

export default HeroSlide;
