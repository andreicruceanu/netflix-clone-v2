import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import BorderedBottomBox from "./BorderedBottomBox";
import ImgTv from "../../assets/images/tv.png";
import VideoTv from "../../assets/videos/tv.m4v";
const Title = ({ text }) => (
  <Typography
    variant="h3"
    component="h2"
    gutterBottom
    sx={{ textAlign: { xs: "center", md: "left" } }}
  >
    {text}
  </Typography>
);

const Description = ({ text }) => (
  <Typography
    variant="h5"
    component="h3"
    sx={{ textAlign: { xs: "center", md: "left" } }}
  >
    {text}
  </Typography>
);

const Features = () => {
  return (
    <Box sx={{ bgcolor: "common.black", color: "common.white" }}>
      <BorderedBottomBox>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container alignItems="center" columnSpacing={12}>
            <Grid item xs={12} md={6}>
              <Title text="Enjoy on your TV." />
              <Description text="Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more." />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: "relative" }}>
                <Box sx={{ position: "relative", zIndex: 2 }}>
                  <img
                    src={ImgTv}
                    alt="Tv"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "640px",
                      maxHeight: "480px",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    maxWidth: "72%",
                    maxHeight: "54%",
                    top: "48%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <video
                    src={VideoTv}
                    style={{ height: "100%", width: "100%" }}
                    autoPlay
                    playsInline
                    muted
                    loop
                  ></video>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </BorderedBottomBox>
    </Box>
  );
};

export default Features;
