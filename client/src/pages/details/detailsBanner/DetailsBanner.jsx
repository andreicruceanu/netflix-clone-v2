import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Img from "../../../components/common/Img";
import ImageHeader from "../../../components/common/ImageHeader";
import tmdbConfigs from "../../../api/configs/tmdb.configs";
import ContainerMediaDetails from "../ContentWrapper/ContainerMediaDetails";
import PosterFallback from "../../../assets/images/no-poster.png";
import MaxLineTypography from "../../../components/common/MaxLineTypography";
import {
  formatReleaseDate,
  getFormatTime,
  getReleaseYear,
} from "../../../utils/function";
import Genres from "../../../components/common/Genres";
import CircularRate from "../../../components/common/CircularRate";
import { PlayIcon } from "../Playbtn";
import dayjs from "dayjs";
import ButtonFavorite from "../../../components/common/ButtonFavorite";
import NetflixIconButton from "../../../components/common/NetflixIconButton";
import Preferences from "../../../components/common/Preferences";
import uiConfigs from "../../../configs/ui.configs.js";
import VideoPopup from "../../../components/common/VideoPopup.jsx";

const DetailsBanner = ({ media, mediaType, officialVideo }) => {
  const [poster, setPoster] = useState(null);
  const [director, setDirector] = useState([]);
  const [writer, setWriter] = useState([]);
  const [releaseDate, setReleaseDate] = useState("");

  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const formatDirationMedia =
    mediaType === "movie" ? "Runtime" : "Number of seasons";

  useEffect(() => {
    if (media) {
      setPoster(
        media?.poster_path ||
          media?.backdrop_path ||
          media?.mediaPoster ||
          media?.profile_path
      );
      setDirector(media?.credits?.crew.filter((f) => f.job === "Director"));
      setWriter(
        media?.credits?.crew.filter(
          (f) =>
            f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
        )
      );
      setVideoId(
        media.videos.results &&
          media?.videos?.results.find((el) => el.official === true)?.key
      );
      setReleaseDate(
        media.release_date || media.first_air_date || media.last_air_date
      );
    }
  }, [media]);

  return (
    <>
      <ImageHeader
        imgPath={tmdbConfigs.backdropPath(
          media.backdrop_path || media.poster_path
        )}
      />
      <ContainerMediaDetails>
        <Box
          sx={{
            marginTop: { xs: "-16rem", md: "-20rem", lg: "-40rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              position: "relative",
              flexDirection: { md: "row", xs: "column" },
              gap: { md: "50px", xs: "25px" },
            }}
          >
            <Box sx={{ flexShrink: 0 }}>
              {poster ? (
                <Img
                  src={tmdbConfigs.posterPath(poster)}
                  className="posterImg"
                  alt={media?.name}
                />
              ) : (
                <Img
                  className="posterImg"
                  src={PosterFallback}
                  alt="no-poster"
                />
              )}
            </Box>
            <Box sx={{ color: "white" }}>
              <MaxLineTypography
                variant="h3"
                maxLine={2}
                color="text.primary"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "28px", md: "28px" },
                  lineHeight: "1.5",
                }}
              >
                {media.name || media.title}
                {` (${getReleaseYear(
                  mediaType,
                  media?.release_date ||
                    media?.first_air_date ||
                    media?.last_air_date
                )})`}
              </MaxLineTypography>
              <Typography
                variant="h6"
                sx={{
                  ...uiConfigs.style.tagline,
                }}
              >
                {media?.tagline}
              </Typography>
              <Genres data={media?.genres} />
              <Stack
                direction="row"
                alignItems="center"
                sx={{ marginTop: 3 }}
                spacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <CircularRate value={media?.vote_average} />
                <NetflixIconButton sx={{ padding: 0.8, borderColor: "white" }}>
                  <ButtonFavorite media={media} mediaType={mediaType} />
                </NetflixIconButton>
                <Preferences
                  mediaId={media.id}
                  mediaType={mediaType}
                  sx={{ padding: 0.7, borderColor: "white" }}
                />
                {officialVideo && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "20px",
                      cursor: "pointer",
                    }}
                    className="playbtn"
                    onClick={() => {
                      setVideoId(officialVideo.key);
                      setShow(true);
                    }}
                  >
                    <PlayIcon />
                    <Typography className="text">Watch Trailer</Typography>
                  </Box>
                )}
              </Stack>
              <Box>
                <Typography variant="h5" mt={2} sx={{ fontWeight: 600 }}>
                  Overview
                </Typography>
                <Typography
                  variant="body1"
                  mt={2}
                  sx={{ fontWeight: 500, textAlign: "justify" }}
                >
                  {media.overview}
                </Typography>
              </Box>
              <Box
                sx={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                  padding: "15px 0",
                }}
              >
                <Stack direction="row" spacing={2.4}>
                  {media?.status && (
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>
                        Status:{" "}
                        <Typography component="span" sx={{ opacity: "0.5" }}>
                          {media.status}
                        </Typography>
                      </Typography>
                    </Box>
                  )}
                  {(media?.release_date || media?.first_air_date) && (
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>
                        Release Date:{" "}
                        <Typography component="span" sx={{ opacity: "0.5" }}>
                          {formatReleaseDate(mediaType, releaseDate)}
                        </Typography>
                      </Typography>
                    </Box>
                  )}
                  {(media?.runtime || media.number_of_seasons) && (
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>
                        {formatDirationMedia}:{" "}
                        <Typography component="span" sx={{ opacity: "0.5" }}>
                          {getFormatTime(
                            mediaType,
                            media?.runtime || media?.number_of_seasons
                          )}
                        </Typography>
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Box>
              <Box
                sx={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                  padding: "15px 0",
                }}
              >
                {director?.length > 0 && (
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>
                      Director:{" "}
                      {director.map((d, i) => (
                        <Typography
                          sx={{ opacity: "0.5" }}
                          component="span"
                          key={i}
                        >
                          {d.name}
                          {director.length - 1 !== i && ", "}
                        </Typography>
                      ))}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box
                sx={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                  padding: "15px 0",
                }}
              >
                {writer?.length > 0 && (
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>
                      Writer:{" "}
                      {writer.map((d, i) => (
                        <Typography
                          sx={{ opacity: "0.5" }}
                          component="span"
                          key={i}
                        >
                          {d.name}
                          {writer.length - 1 !== i && ", "}
                        </Typography>
                      ))}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <VideoPopup
          show={show}
          setShow={setShow}
          videoId={videoId}
          setVideoId={setVideoId}
        />
      </ContainerMediaDetails>
    </>
  );
};

export default DetailsBanner;
