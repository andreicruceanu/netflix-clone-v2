import { Box, useMediaQuery } from "@mui/material";

import HeroSlide from "../../components/common/HeroSlide";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import Container from "../../components/common/Container";
import uiConfigs from "../../configs/ui.configs";
import MediaSlide from "../../components/common/MediaSlide";
import MediaSlideTop from "../../components/common/MediaSlideTop";
import MediaSlideWithGenre from "../../components/common/MediaSlideWithGenre";

const Movies = () => {
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
        <Container header={"We Think You’ll Love These"}>
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          />
        </Container>

        <Container header="Popular Movie">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          />
        </Container>

        <Container header={"Top 10 Movies in Romania Today"}>
          <MediaSlideTop
            mediaType={tmdbConfigs.mediaType.movie}
            time={tmdbConfigs.time.day}
          />
        </Container>

        <Container header="Comedy Movies">
          <MediaSlideWithGenre
            mediaType={tmdbConfigs.mediaType.movie}
            genreName={tmdbConfigs.genresName.comedy}
          />
        </Container>

        <Container header="Adventure Movies">
          <MediaSlideWithGenre
            mediaType={tmdbConfigs.mediaType.movie}
            genreName={tmdbConfigs.genresName.adventure}
          />
        </Container>

        <Container header="Documentary Movies">
          <MediaSlideWithGenre
            mediaType={tmdbConfigs.mediaType.movie}
            genreName={tmdbConfigs.genresName.documentary}
          />
        </Container>

        <Container header={"Top 10 Movies in Romania this week"}>
          <MediaSlideTop
            mediaType={tmdbConfigs.mediaType.movie}
            time={tmdbConfigs.time.week}
          />
        </Container>
        <Container header="Drama Movies">
          <MediaSlideWithGenre
            mediaType={tmdbConfigs.mediaType.movie}
            genreName={tmdbConfigs.genresName.drama}
          />
        </Container>
      </Box>
    </>
  );
};

export default Movies;
