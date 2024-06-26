import { useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import {
  setGenresMovieSlice,
  setGenresSeriesSlice,
} from "../redux/features/genresStateSlice";

import HeroSlide from "../components/common/HeroSlide";
import tmdbConfigs from "../api/configs/tmdb.configs";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import MediaSlideTop from "../components/common/MediaSlideTop";
import MediaSlide from "../components/common/MediaSlide";
import genreApi from "../api/modules/genre.api";
import MediaSlideWithGenre from "../components/common/MediaSlideWithGenre";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getGenresSeries = async () => {
      const { response, err } = await genreApi.getList({
        mediaType: tmdbConfigs.mediaType.tv,
      });

      if (response) {
        dispatch(setGenresSeriesSlice(response.genres));
      }
      if (err) {
        toast.error(err.message);
      }
    };
    getGenresSeries();
  }, [dispatch]);

  useEffect(() => {
    const getGenresMovie = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await genreApi.getList({
        mediaType: tmdbConfigs.mediaType.movie,
      });
      dispatch(setGlobalLoading(false));
      if (response) {
        dispatch(setGenresMovieSlice(response.genres));
      }
      if (err) {
        toast.error(err.message);
      }
    };
    getGenresMovie();
  }, [dispatch]);

  const isMobile = useMediaQuery("(max-width:850px)");

  return (
    <>
      {!isMobile && (
        <HeroSlide
          mediaType={tmdbConfigs.mediaType.movie}
          mediaCategory={tmdbConfigs.mediaCategory.popular}
        />
      )}
      <Box sx={{ ...uiConfigs.style.mainContent, marginTop: { xs: 9, md: 0 } }}>
        <Container header={"Top 10 Movies in Romania Today"}>
          <MediaSlideTop
            mediaType={tmdbConfigs.mediaType.movie}
            time={tmdbConfigs.time.day}
          />
        </Container>

        <Container header="Popular Movies">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          />
        </Container>

        <Container header="Popular Series">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          />
        </Container>

        <Container header="Top rated movies">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          />
        </Container>

        <Container header="Top rated series">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          />
        </Container>

        <Container header="Comedy  Movies">
          <MediaSlideWithGenre
            mediaType={tmdbConfigs.mediaType.movie}
            genreName={tmdbConfigs.genresName.comedy}
          />
        </Container>

        <Container header="Documentary  Movies">
          <MediaSlideWithGenre
            mediaType={tmdbConfigs.mediaType.movie}
            genreName={tmdbConfigs.genresName.documentary}
          />
        </Container>
        <Container header="Action  Movies">
          <MediaSlideWithGenre
            mediaType={tmdbConfigs.mediaType.movie}
            genreName={tmdbConfigs.genresName.action}
          />
        </Container>
        <Container header="Drama  Serials TV">
          <MediaSlideWithGenre
            mediaType={tmdbConfigs.mediaType.tv}
            genreName={tmdbConfigs.genresName.drama}
          />
        </Container>
        <Container header="Horror Movies">
          <MediaSlideWithGenre
            mediaType={tmdbConfigs.mediaType.movie}
            genreName={tmdbConfigs.genresName.horror}
          />
        </Container>
      </Box>
    </>
  );
};

export default Home;
