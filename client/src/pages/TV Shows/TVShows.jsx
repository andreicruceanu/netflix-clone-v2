import { Box, useMediaQuery } from "@mui/material";

import HeroSlide from "../../components/common/HeroSlide";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import Container from "../../components/common/Container";
import uiConfigs from "../../configs/ui.configs";
import MediaSlide from "../../components/common/MediaSlide";
import MediaSlideTop from "../../components/common/MediaSlideTop";
import MediaSlideWithGenre from "../../components/common/MediaSlideWithGenre";

const TVShows = () => {
  const isMobile = useMediaQuery("(max-width:850px)");

  return (
    <>
      {!isMobile && (
        <HeroSlide
          mediaType={tmdbConfigs.mediaType.tv}
          mediaCategory={tmdbConfigs.mediaCategory.popular}
        />
      )}

      <Box sx={{ ...uiConfigs.style.mainContent, marginTop: { xs: 9, md: 0 } }}>
        <Container header={"We Think You’ll Love These"}>
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          />
        </Container>

        <Container header="Popular TV Series">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          />
        </Container>

        <Container header={"Top 10 Tv Shows in Romania Today"}>
          <MediaSlideTop
            mediaType={tmdbConfigs.mediaType.tv}
            time={tmdbConfigs.time.day}
          />
        </Container>

        <Container header="Comedy Tv Serials">
          <MediaSlideWithGenre
            mediaType={tmdbConfigs.mediaType.tv}
            genreName={tmdbConfigs.genresName.comedy}
          />
        </Container>

        <Container header="War & Politics Tv Serials">
          <MediaSlideWithGenre
            mediaType={tmdbConfigs.mediaType.tv}
            genreName={tmdbConfigs.genresName.war}
          />
        </Container>

        <Container header="Action TV Serials">
          <MediaSlideWithGenre
            mediaType={tmdbConfigs.mediaType.tv}
            genreName={tmdbConfigs.genresName.actionTv}
          />
        </Container>

        <Container header={"Top 10 Tv Shows in Romania this week"}>
          <MediaSlideTop
            mediaType={tmdbConfigs.mediaType.tv}
            time={tmdbConfigs.time.week}
          />
        </Container>
        <Container header="Kids TV Serials">
          <MediaSlideWithGenre
            mediaType={tmdbConfigs.mediaType.tv}
            genreName={tmdbConfigs.genresName.kids}
          />
        </Container>
      </Box>
    </>
  );
};

export default TVShows;
