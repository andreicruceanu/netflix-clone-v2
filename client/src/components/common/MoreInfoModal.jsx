import {
  Box,
  Chip,
  Container,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import mediaApi from "../../api/modules/media.api";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs.js";
import { useTheme } from "@emotion/react";
import Loading from "./Loading";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ButtonCard from "./ButtonCard";
import ButtonFavorite from "./ButtonFavorite";
import { toast } from "react-toastify";
import Preferences from "./Preferences";
import VideoJSPlayer from "./watch/VideoJSPlayer";
import MaxLineTypography from "./MaxLineTypography";
import PlayButton from "./PlayButton";
import NetflixIconButton from "./NetflixIconButton";
import { formatMinuteToReadable, getRandomNumber } from "../../utils/function";
import ChipNetflix from "./ChipNetflix";
import CastLink from "./CastLink";
import SimilarVideoCard from "./SimilarVideoCard";

function MoreInfoModal({ open, onClose, mediaId, mediaType }) {
  const [media, setMedia] = useState();
  const playerRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [similarMovies, setSimilarMovies] = useState([]);

  console.log(media);

  useEffect(() => {
    if (open && mediaType && mediaId) {
      const getMoreDetails = async () => {
        const { response, err } = await mediaApi.getMoreDetails({
          mediaType,
          mediaId,
        });

        if (response) {
          setMedia(response);
          console.log(response);
        }
        if (err) {
          toast.error(err.message);
        }
      };

      getMoreDetails();
    }
  }, [mediaType, mediaId, open]);

  useEffect(() => {
    const getSimilarMovies = async () => {
      const { response, err } = await mediaApi.getSimilarMovie({
        mediaId,
        mediaType,
      });
      if (response) {
        setSimilarMovies(response.results);
      }
      if (err) {
        console.log(err);
      }
    };
    getSimilarMovies();
  }, [mediaId, mediaType]);

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

  return (
    media && (
      <Dialog
        fullWidth
        scroll="body"
        maxWidth="md"
        open={open}
        id="detail_dialog"
      >
        <DialogContent sx={{ p: 0, bgcolor: "#181818" }}>
          <Box
            sx={{
              top: 0,
              left: 0,
              right: 0,
              position: "relative",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: "100%",
                position: "relative",
                height: "calc(9 / 16 * 100%)",
              }}
            >
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
                      type: "video/youtube",
                      src: `https://www.youtube.com/watch?v=${
                        media.officialTrailer.key || "L3oOldViIgY"
                      }`,
                    },
                  ],
                }}
                onReady={handleReady}
              />

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
                  backgroundColor: "transparent",
                  backgroundImage:
                    "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414)",
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
              <IconButton
                onClick={onClose}
                sx={{
                  top: 15,
                  right: 15,
                  position: "absolute",
                  bgcolor: "#181818",
                  width: { xs: 22, sm: 40 },
                  height: { xs: 22, sm: 40 },
                  "&:hover": {
                    bgcolor: "primary.main",
                  },
                }}
              >
                <CloseIcon
                  sx={{ color: "white", fontSize: { xs: 14, sm: 22 } }}
                />
              </IconButton>
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 16,
                  px: { xs: 2, sm: 3, md: 5 },
                }}
              >
                <MaxLineTypography variant="h4" maxLine={1} sx={{ mb: 2 }}>
                  {media.title}
                </MaxLineTypography>
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <PlayButton sx={{ color: "black", py: 0 }} />
                  <NetflixIconButton sx={{ padding: 0 }}>
                    <ButtonFavorite media={media} mediaType={mediaType} />
                  </NetflixIconButton>
                  <Preferences media={media} mediaType={mediaType} />
                </Stack>

                <Container
                  sx={{
                    p: "0px !important",
                  }}
                >
                  <Grid container spacing={5} alignItems="center">
                    <Grid item xs={12} sm={6} md={8}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "#46d369" }}
                        >{`${getRandomNumber(100)}% Match`}</Typography>
                        <Typography variant="body2">
                          {media?.release_date.substring(0, 4) ||
                            media.first_air_date.substring(0, 4)}
                        </Typography>
                        <ChipNetflix
                          label={`${getRandomNumber(20)}+`}
                        ></ChipNetflix>
                        <Typography variant="subtitle2">{`${formatMinuteToReadable(
                          media.runtime
                        )}`}</Typography>
                        <ChipNetflix label="HD"></ChipNetflix>
                      </Stack>
                      <MaxLineTypography
                        maxLine={3}
                        variant="body1"
                        sx={{ mt: 2 }}
                      >
                        {media?.overview}
                      </MaxLineTypography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography
                        variant="body2"
                        sx={{ my: 1, mr: 1 }}
                        component="span"
                      >
                        Cast :
                      </Typography>
                      {media.credits.cast.slice(0, 5).map((item) => (
                        <CastLink name={item.name} id={item.id} />
                      ))}

                      <Typography variant="body2" sx={{ my: 1 }}>
                        {`Genres : ${media?.genres
                          .map((g) => g.name)
                          .join(", ")}`}
                      </Typography>
                      <Typography variant="body2" sx={{ my: 1 }}>
                        {`Available in : ${media?.spoken_languages
                          .map((l) => l.name)
                          .join(", ")}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </Box>
            {similarMovies && similarMovies.length > 0 && (
              <Container
                sx={{
                  py: 2,
                  px: { xs: 2, sm: 3, md: 5 },
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  More Like This
                </Typography>
                <Grid container spacing={2}>
                  {similarMovies.map((sm) => (
                    <Grid item xs={6} sm={4} key={sm.id}>
                      <SimilarVideoCard movie={sm} mediaType={mediaType} />
                    </Grid>
                  ))}
                </Grid>
              </Container>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    )
  );
}

export default MoreInfoModal;
