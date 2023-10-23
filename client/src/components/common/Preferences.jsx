import { LoadingButton } from "@mui/lab";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ButtonCard from "./ButtonCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import preferencesApi from "../../api/modules/preferences.api";
import { toast } from "react-toastify";
import {
  addPreference,
  removePreference,
} from "../../redux/features/userSlice";

const typePreferences = {
  like: "like",
  dislike: "dislike",
  none: "none",
};

const Preferences = ({ mediaType, mediaId }) => {
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
    console.log(listPreferences);
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
      <ButtonCard>
        <LoadingButton
          variant="text"
          sx={{
            minWidth: "100%",
            padding: "0",
            color: "white",
            span: {
              marginRight: "0px",
              marginLeft: "0px",
            },

            "&:hover ": {
              border: "none",
              backgroundColor: "none",
            },
          }}
          size="large"
          loading={onRequestLike}
          startIcon={isLiked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
          onClick={handleLiked}
        />
      </ButtonCard>
      <ButtonCard>
        <LoadingButton
          variant="text"
          sx={{
            minWidth: "100%",
            padding: "0",
            color: "white",
            span: {
              marginRight: "0px",
              marginLeft: "0px",
            },

            "&:hover ": {
              border: "none",
              backgroundColor: "none",
            },
          }}
          size="large"
          startIcon={
            isDisliked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />
          }
          loading={onRequestDislike}
          onClick={handleDisliked}
        ></LoadingButton>
      </ButtonCard>
    </>
  );
};

export default Preferences;
