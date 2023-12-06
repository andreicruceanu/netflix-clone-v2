import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import mediaApi from "../../api/modules/media.api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";

const MediaDetail = () => {
  const { user, listFavorites } = useSelector((state) => state.user);
  const [media, setMedia] = useState();
  const [onRequest, setOnRequest] = useState(false);
  const dispatch = useDispatch();
  const { mediaType, mediaId } = useParams();

  console.log(media);

  useEffect(() => {
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

  return media ? (
    <>
      <DetailsBanner media={media} mediaType={mediaType} />
      <Cast casts={media?.credits?.cast} />
    </>
  ) : (
    ""
  );
};

export default MediaDetail;
