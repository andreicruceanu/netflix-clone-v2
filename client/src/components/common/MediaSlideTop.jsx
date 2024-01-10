import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper";
import mediaApi from "../../api/modules/media.api";
import { toast } from "react-toastify";
import MediaItemTop from "./MediaItemTop";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";

const MediaSlideTop = ({ mediaType, time }) => {
  const [medias, setMedias] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const getMedias = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getTrending({
        mediaType,
        time,
        page: 1,
      });
      dispatch(setGlobalLoading(false));
      if (response) {
        setMedias(response.results);
      }
      if (err) toast.error(err.message);
    };
    getMedias();
  }, [mediaType, time]);

  return (
    <AutoSwiper>
      {medias.slice(0, 10).map((media, index) => (
        <SwiperSlide
          key={index}
          style={{ width: "285px", height: "205px", marginRight: "25px" }}
        >
          <MediaItemTop media={media} index={index} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlideTop;
