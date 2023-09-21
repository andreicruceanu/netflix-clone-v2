import React from "react";
import HeroSlide from "../components/common/HeroSlide";
import tmdbConfigs from "../api/configs/tmdb.configs";
import { Box } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import MediaSlideTop from "../components/common/MediaSlideTop";
import MediaSlide from "../components/common/MediaSlide";
const Home = () => {
  return (
    <>
      <HeroSlide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
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
      </Box>
    </>
  );
};

export default Home;
