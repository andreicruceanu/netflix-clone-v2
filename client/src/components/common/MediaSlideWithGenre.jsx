import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import mediaApi from "../../api/modules/media.api";
import AutoSwiper from "./AutoSwiper";
import MediaItem from "./MediaItem";
import tmdbConfigs from "../../api/configs/tmdb.configs";

const MediaSlideWithGenre = ({ mediaType, genreName }) => {
  const [medias, setMedias] = useState([]);
  const [genreId, setGenreId] = useState(undefined);
  const { genresMovie, genresSeries } = useSelector((state) => state.genres);

  useEffect(() => {
    const genre =
      mediaType === tmdbConfigs.mediaType.movie
        ? genresMovie &&
          genresMovie.find((el) => el.name.toString() === genreName.toString())
        : genresSeries &&
          genresSeries.find(
            (el) => el.name.toString() === genreName.toString()
          );
    setGenreId(genre?.id || undefined);
  }, [genresMovie, genreName, mediaType, genresSeries]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getDiscover({
        mediaType,
        genreId,
      });

      if (response) {
        setMedias(response.results);
      }
      if (err) {
        toast.error(err.message);
      }
    };
    if (genreId) {
      getMedias();
    }
  }, [mediaType, genreId]);
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

export default MediaSlideWithGenre;
