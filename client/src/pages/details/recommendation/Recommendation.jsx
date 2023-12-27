import React from "react";
import ContainerMediaDetails from "../ContentWrapper/ContainerMediaDetails";
import { Box, Typography } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import MediaItem from "../../../components/common/MediaItem";
import SwiperDetailMedia from "../../../components/common/SwiperDetailMedia";

const Recommendation = ({ mediaRecommendation, mediaType }) => {
  return (
    mediaRecommendation.length > 0 && (
      <React.Fragment>
        <Box sx={{ mt: "50px", mb: "60px" }}>
          <ContainerMediaDetails>
            <Typography
              sx={{
                fontSize: "24px",
                color: "white",
                marginBottom: "25px",
                fontWeight: 600,
              }}
            >
              Recommendations
            </Typography>
            <SwiperDetailMedia>
              {mediaRecommendation.map((media, index) => (
                <SwiperSlide key={index}>
                  <MediaItem media={media} mediaType={mediaType} />
                </SwiperSlide>
              ))}
            </SwiperDetailMedia>
          </ContainerMediaDetails>
        </Box>
      </React.Fragment>
    )
  );
};

export default Recommendation;
