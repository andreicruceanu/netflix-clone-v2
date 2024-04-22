import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { SwiperSlide } from "swiper/react";

import ContainerMediaDetails from "../ContentWrapper/ContainerMediaDetails";
import MediaItem from "../../../components/common/MediaItem";
import SwiperDetailMedia from "../../../components/common/SwiperDetailMedia";
import mediaApi from "../../../api/modules/media.api";

const Similar = ({ mediaType, mediaId }) => {
  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  const [mediaSimilar, setMediaSimilar] = useState([]);

  useEffect(() => {
    const getSimilar = async () => {
      const { response, err } = await mediaApi.getSimilarMovie({
        mediaType,
        mediaId,
      });

      if (response) {
        setMediaSimilar(response.results);
      }
      if (err) {
        console.log(err);
      }
    };
    getSimilar();
  }, [mediaType, mediaId]);
  return (
    mediaSimilar.length > 0 && (
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
              {title}
            </Typography>
            <SwiperDetailMedia>
              {mediaSimilar.map((media) => (
                <SwiperSlide key={media.id}>
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

export default Similar;
