import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { useSearchGlobal } from "../components/context/SearchContext";

import Container from "../components/common/Container";
import tmdbConfigs from "../api/configs/tmdb.configs";
import Loading from "../components/common/Loading";
import uiConfigs from "../configs/ui.configs";
import MediaGrid from "../components/common/MediaGrid";

const MediaSearch = () => {
  const [movies, setMovies] = useState([]);
  const [serialsTv, setSerialsTv] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));

  const { searchResponse, loading, querySearch } = useSearchGlobal();

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuery(searchParams.get("query"));
  }, [query]);

  useEffect(() => {
    if (searchResponse) {
      setMovies(
        searchResponse
          .filter(
            (el) =>
              el.media_type === tmdbConfigs.mediaType.movie ||
              (el.media_type === tmdbConfigs.mediaType.person &&
                Array.isArray(el.known_for) &&
                el.known_for.length > 0)
          )
          .flatMap((el) =>
            el.media_type === tmdbConfigs.mediaType.movie
              ? [el]
              : el.known_for.map((knownForItem) => ({
                  ...el,
                  ...knownForItem,
                }))
          )
      );
      setSerialsTv(
        searchResponse.filter(
          (el) => el.media_type === tmdbConfigs.mediaType.tv
        )
      );
    }
  }, [searchResponse]);

  if (loading) return <Loading />;

  return (
    searchResponse &&
    (searchResponse.length > 0 ? (
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Box sx={{ mt: "70px" }}>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "16px", md: "20px" }, mb: 2 }}
          >
            Search results of
            <Typography
              component="span"
              sx={{
                color: "rgb(255, 160, 10)",
                fontSize: { xs: "16px", md: "20px" },
              }}
            >
              {` "${querySearch}"`}
            </Typography>
          </Typography>
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
    ) : (
      <Typography
        variant="h6"
        style={{
          marginTop: "30vh",
          marginBottom: "60px",
          fontSize: { xs: "16px", md: "20px" },
        }}
        align="center"
      >
        No results for{" "}
        <Typography
          component="span"
          sx={{
            color: "rgb(255, 160, 10)",
            fontSize: { xs: "16px", md: "20px" },
          }}
        >
          {` "${querySearch}"`}
        </Typography>
      </Typography>
    ))
  );
};

export default MediaSearch;
