import { useEffect, useState } from "react";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { useDispatch } from "react-redux";
import { SwiperSlide } from "swiper/react";
import { useMediaQuery } from "@mui/material";
import { toast } from "react-toastify";

import AutoSwiper from "./AutoSwiper";
import mediaApi from "../../api/modules/media.api";
import MediaItemTop from "./MediaItemTop";

const MediaSlideTop = ({ mediaType, time }) => {
  const [medias, setMedias] = useState([]);
  const isMobile = useMediaQuery("(max-width:850px)");

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
          style={{
            width: isMobile ? "210px" : "285px",
            height: isMobile ? "160px" : "205px",
            marginRight: "25px",
          }}
        >
          <MediaItemTop media={media} index={index} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlideTop;
