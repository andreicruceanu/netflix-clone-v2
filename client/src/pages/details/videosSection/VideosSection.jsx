import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Typography } from "@mui/material";
import { PlayIcon } from "../Playbtn";

import ContainerMediaDetails from "../ContentWrapper/ContainerMediaDetails";
import Img from "../../../components/common/Img";
import tmdbConfigs from "../../../api/configs/tmdb.configs";
import VideoPopup from "../../../components/common/VideoPopup";

const VideosSection = ({ videos }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  return (
    videos.results.length > 0 && (
      <Box sx={{ position: "relative", marginBottom: "50px" }}>
        <ContainerMediaDetails>
          <Typography
            sx={{
              fontSize: "24px",
              color: "white",
              marginBottom: "25px",
              fontWeight: 600,
            }}
          >
            Official Videos
          </Typography>
          <Box
            sx={{
              "& .swiper-slide": {
                width: { xs: "50%", md: "25%" },
              },
            }}
          >
            <Swiper
              spaceBetween={20}
              slidesPerView={"auto"}
              grabCursor={true}
              style={{ width: "100%", height: "max-content" }}
            >
              {videos.results?.map((video) => (
                <SwiperSlide key={video.id}>
                  <Box
                    sx={{
                      position: "relative",
                      marginBottom: "15px",
                      cursor: "pointer",
                    }}
                    className="videoThumbnail"
                    onClick={() => {
                      setVideoId(video.key);
                      setShow(true);
                    }}
                  >
                    <Img
                      src={tmdbConfigs.youtubePhoto(video.key)}
                      alt={video?.name}
                      className="videoImg"
                    />
                    <PlayIcon />
                  </Box>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "15px",
                      fontWeight: 600,
                      lineHeight: "20px",
                    }}
                  >
                    {video.name}
                  </Typography>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </ContainerMediaDetails>
        <VideoPopup
          show={show}
          setShow={setShow}
          videoId={videoId}
          setVideoId={setVideoId}
        />
      </Box>
    )
  );
};

export default VideosSection;
