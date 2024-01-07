import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../components/common/Container";
import mediaApi from "../api/modules/media.api";
import {
  useSearch,
  useSearchGlobal,
} from "../components/context/SearchContext";
import MediaItem from "../components/common/MediaItem";
import AutoSwiper from "../components/common/AutoSwiper";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../api/configs/tmdb.configs";
import Loading from "../components/common/Loading";
import { Box, Stack, Typography } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import MediaGrid from "../components/common/MediaGrid";
import ActorMediaGrid from "./actorDetail/ActorMediaGrid";

const MediaSearch = () => {
  const [movies, setMovies] = useState([]);
  const [serialsTv, setSerialsTv] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));

  const { searchResponse, loading } = useSearchGlobal();

  const updatedResponse = searchResponse
    .filter(
      (el) =>
        el.media_type === tmdbConfigs.mediaType.movie ||
        (el.media_type === tmdbConfigs.mediaType.person &&
          Array.isArray(el.known_for) &&
          el.known_for.length > 0)
    )
    .flatMap((el) =>
      el.media_type === tmdbConfigs.mediaType.movie
        ? [el] // Dacă este film, returnează direct elementul
        : el.known_for.map((knownForItem) => ({
            ...el,
            ...knownForItem,
            // Dacă ai nevoie de alte modificări sau adăugiri aici
          }))
    );
  useEffect(() => {
    setQuery(searchParams.get("query"));
  }, [query]);

  useEffect(() => {
    setMovies(updatedResponse);

    setSerialsTv(
      searchResponse.filter((el) => el.media_type === tmdbConfigs.mediaType.tv)
    );
  }, [searchResponse]);

  if (loading) return <Loading />;

  console.log(movies);

  return (
    searchResponse && (
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Box sx={{ mt: "100px" }}>
          <Typography variant="h5">{`Search results of '${query}'`}</Typography>
          <Stack direction="column" spacing={3}>
            {movies.length > 0 && (
              <Container header="Movies">
                <MediaGrid
                  medias={movies}
                  mediaType={tmdbConfigs.mediaType.movie}
                />
              </Container>
            )}
            {serialsTv.length > 0 && (
              <Container header="TV Shows">
                <MediaGrid
                  medias={serialsTv}
                  mediaType={tmdbConfigs.mediaType.tv}
                />
              </Container>
            )}
          </Stack>
        </Box>
      </Box>
    )
  );
};

export default MediaSearch;
