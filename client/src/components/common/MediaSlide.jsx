import React, { useEffect, useState } from "react";
import mediaApi from "../../api/modules/media.api";

import AutoSwiper from "./AutoSwiper";
import MediaItem from "./MediaItem";

import { SwiperSlide } from "swiper/react";

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) {
        setMedias(response.results);
      }
      if (err) {
        console.log(err);
      }
    };
    getMedias();
  }, [mediaType, mediaCategory]);
  console.log(medias);

  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;
