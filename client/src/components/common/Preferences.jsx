import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { LoadingButton } from "@mui/lab";
import { PREFERENCES } from "../../utils/constants";
import { toast } from "react-toastify";
import {
  addPreference,
  removePreference,
} from "../../redux/features/userSlice";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import preferencesApi from "../../api/modules/preferences.api";

import NetflixIconButton from "./NetflixIconButton";
import TooltipNetflix from "./TooltipNetflix";

const typePreferences = {
  like: "like",
  dislike: "dislike",
  none: "none",
};

const Preferences = ({ mediaType, mediaId, sx }) => {
  const { user, listPreferences } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [onRequestLike, setOnRequestLike] = useState(false);
  const [onRequestDislike, setOnRequestDislike] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleLiked = async () => {
    if (!user) {
      return dispatch(setAuthModalOpen(true));
    }
    if (onRequestLike) {
      return;
    }

    if (isLiked) {
      deletePreference({ type: typePreferences.like });
      return;
    }
    setOnRequestLike(true);

    const { response, err } = await preferencesApi.reactionControl({
      mediaId,
      mediaType,
      type: typePreferences.like,
    });
    setOnRequestLike(false);

    if (err) {
      toast.error(err.message);
    }
    if (response) {
      dispatch(addPreference(response));
      setIsDisliked(false);
      setIsLiked(true);
    }
  };

  const handleDisliked = async () => {
    if (!user) {
      return dispatch(setAuthModalOpen(true));
    }
    if (onRequestDislike) {
      return;
    }
    if (isDisliked) {
      deletePreference({ type: typePreferences.dislike });
      return;
    }
    setOnRequestDislike(true);
    const { response, err } = await preferencesApi.reactionControl({
      mediaId,
      mediaType,
      type: typePreferences.dislike,
    });
    setOnRequestDislike(false);

    if (err) {
      toast.error(err.message);
    }
    if (response) {
      dispatch(addPreference(response));
      setIsLiked(false);
      setIsDisliked(true);
    }
  };

  const deletePreference = async ({ type }) => {
    if (onRequestLike && onRequestDislike) {
      return;
    }
    if (type === typePreferences.like) setOnRequestLike(true);
    if (type === typePreferences.dislike) setOnRequestDislike(true);
    const preference = listPreferences.find(
      (item) =>
        item.mediaId === mediaId &&
        (item.isLiked === true || item.isDisliked === true)
    );
    const { response, err } = await preferencesApi.reactionControl({
      mediaId,
      mediaType,
      type: typePreferences.none,
    });
    if (type === typePreferences.like) setOnRequestLike(false);
    if (type === typePreferences.dislike) setOnRequestDislike(false);

    if (err) {
      toast.error(err.message);
    }
    if (response) {
      dispatch(removePreference(preference));
      setIsDisliked(false);
      setIsLiked(false);
    }
  };

  useEffect(() => {
    const likedMovie = listPreferences.find(
      (item) =>
        item.mediaId === mediaId &&
        item.isLiked === true &&
        item.isDisliked === false
    );
    const dislikedMovie = listPreferences.find(
      (item) =>
        item.mediaId === mediaId &&
        item.isLiked === false &&
        item.isDisliked === true
    );

    if (likedMovie) {
      setIsLiked(true);
    }
    if (dislikedMovie) {
      setIsDisliked(true);
    }
  }, [listPreferences, mediaId]);

  return (
    <>
      <NetflixIconButton sx={{ ...sx }}>
        <TooltipNetflix title={isLiked ? PREFERENCES.rated : PREFERENCES.like}>
          <LoadingButton
            variant="text"
            sx={{
              minWidth: "100%",
              borderRadius: "50%",
              color: "white",
              padding: 1,
              span: {
                marginRight: "0px",
                marginLeft: "0px",
              },

              "&:hover": {
                border: "none",
                background: "none",
              },
            }}
            size="small"
            loading={onRequestLike}
            startIcon={isLiked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
            onClick={handleLiked}
          />
        </TooltipNetflix>
      </NetflixIconButton>
      <NetflixIconButton sx={{ ...sx }}>
        <TooltipNetflix
          title={isDisliked ? PREFERENCES.rated : PREFERENCES.dislike}
        >
          <LoadingButton
            variant="text"
            sx={{
              minWidth: "100%",
              borderRadius: "50%",
              color: "white",
              padding: 1,
              span: {
                marginRight: "0px",
                marginLeft: "0px",
              },
              "&:hover": {
                border: "none",
                background: "none",
              },
            }}
            size="small"
            startIcon={
              isDisliked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />
            }
            loading={onRequestDislike}
            onClick={handleDisliked}
          ></LoadingButton>
        </TooltipNetflix>
      </NetflixIconButton>
    </>
  );
};

export default Preferences;
