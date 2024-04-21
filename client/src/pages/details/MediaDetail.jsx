import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import mediaApi from "../../api/modules/media.api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Reviews from "./reviews/Reviews";
import Recommendation from "./recommendation/Recommendation";
import Similar from "./similar/Similar";
import { useCloseInfoModal } from "../../hook/useCloseInfoModal";

const MediaDetail = () => {
  const [media, setMedia] = useState();
  const [trailer, setTrailer] = useState("");
  const dispatch = useDispatch();
  const { mediaType, mediaId } = useParams();
  const { isOpen } = useSelector((state) => state.infoModal);

  useCloseInfoModal(isOpen);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });
      dispatch(setGlobalLoading(false));

      if (response) {
        setMedia(response);
      }

      if (err) toast.error(err.message);
    };

    getMedia();
  }, [mediaType, mediaId, dispatch]);

  useEffect(() => {
    const getTrailer = async () => {
      const { response, err } = await mediaApi.getTrailer({
        mediaType,
        mediaId,
      });

      if (response) {
        const isEmptyObject = Object.keys(response).length === 0;
        setTrailer(isEmptyObject ? false : response);
      }

      if (err) toast.error(err.message);
    };
    getTrailer();
  }, [mediaType, mediaId, dispatch]);

  return media ? (
    <>
      <DetailsBanner
        media={media}
        mediaType={mediaType}
        officialVideo={trailer}
      />
      <Cast casts={media?.credits?.cast} />
      <VideosSection videos={media?.videos} />
      <Reviews
        reviews={media?.reviews}
        rating={media?.rating}
        mediaType={mediaType}
        media={media}
      />
      <Similar mediaType={mediaType} mediaId={mediaId} />
      <Recommendation
        mediaType={mediaType}
        mediaRecommendation={media.recommend}
      />
    </>
  ) : (
    ""
  );
};

export default MediaDetail;
