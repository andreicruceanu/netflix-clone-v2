import { Box, Container, Grid, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

import BorderedBottomBox from "./BorderedBottomBox";
import ImgTv from "../../assets/images/tv.png";
import VideoTv from "../../assets/videos/tv.m4v";
import VideoDevices from "../../assets/videos/videos_devices.m4v";
import ImgMobile from "../../assets/images/mobile.jpg";
import Imgkid from "../../assets/images/kids.png";
import ImgBoxshot from "../../assets/images/boxshot.png";
import ImgDownload from "../../assets/images/download.gif";
import ImgDivices from "../../assets/images/devices.png";

const Title = ({ text }) => (
  <Typography
    variant="h3"
    component="h2"
    gutterBottom
    sx={{
      textAlign: { xs: "center", md: "left" },
      fontWeight: { xs: 700, md: 900 },
      fontSize: { xs: "2rem", md: "3rem" },
    }}
  >
    {text}
  </Typography>
);

const Description = ({ text }) => (
  <Typography
    variant="h5"
    component="h3"
    sx={{
      textAlign: { xs: "center", md: "left" },
      fontSize: { xs: "1.125rem", md: "1.5rem" },
    }}
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
      <BorderedBottomBox>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container alignItems="center" columnSpacing={12}>
            <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
              <Box sx={{ position: "relative" }}>
                <Box>
                  <img
                    src={ImgMobile}
                    alt="Mobile"
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
                    bgcolor: "common.black",
                    zIndex: 1,
                    border: `2px solid ${grey[700]}`,
                    borderRadius: 2,
                    p: 1,
                    width: {
                      xs: "80%",
                      sm: "70%",
                      md: "60%",
                    },
                    bottom: {
                      xs: "5%",
                      md: "10%",
                    },
                    left: "50%",
                    transform: "translate(-50%, 0)",
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2} md={3}>
                      <img
                        src={ImgBoxshot}
                        alt="Boxshot"
                        style={{
                          width: "100%",
                          height: "auto",
                          maxWidth: "55px",
                          maxHeight: "80px",
                        }}
                      />
                    </Grid>
                    <Grid item xs={8} md={6}>
                      <Typography>Stranger Things</Typography>
                      <Typography variant="body1" color={blue.A400}>
                        Downloading...
                      </Typography>
                    </Grid>
                    <Grid item xs={2} md={3}>
                      <img
                        src={ImgDownload}
                        alt="Download"
                        style={{
                          width: "100%",
                          height: "auto",
                          maxWidth: "50px",
                          maxHeight: "80px",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
              <Title text="Download your shows to watch offline." />
              <Description text="Save your favorites easily and always have something to watch." />
            </Grid>
          </Grid>
        </Container>
      </BorderedBottomBox>

      <BorderedBottomBox>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container alignItems="center" columnSpacing={12}>
            <Grid item xs={12} md={6}>
              <Title text="Watch everywhere." />
              <Description text="Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV." />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: "relative" }}>
                <Box sx={{ position: "relative", zIndex: 2 }}>
                  <img
                    src={ImgDivices}
                    alt="Devices"
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
                    maxWidth: "65%",
                    maxHeight: "49%",
                    top: "33%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <video
                    src={VideoDevices}
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

      <BorderedBottomBox>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container alignItems="center" columnSpacing={12}>
            <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
              <Box>
                <img
                  src={Imgkid}
                  alt="Kids"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "640px",
                    maxHeight: "480px",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
              <Title text="Create profiles for kids." />
              <Description text="Send kids on adventures with their favorite characters in a space made just for them—free with your membership." />
            </Grid>
          </Grid>
        </Container>
      </BorderedBottomBox>
    </Box>
  );
};

export default Features;
