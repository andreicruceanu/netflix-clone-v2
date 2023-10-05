import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import favoriteApi from "../../api/modules/favorite.api";
import { toast } from "react-toastify";
const ButtonFavorite = ({ media, mediaType }) => {
  const { user, listFavorites } = useSelector((state) => state.user);

  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);

  const dispatch = useDispatch();

  const onFavoriteClick = async () => {
    if (!user) {
      return dispatch(setAuthModalOpen(true));
    }
    if (onRequest) {
      return;
    }

    setOnRequest(true);

    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType: mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average,
      mediaGenreIds: media.genre_ids,
      mediaReleaseDate: media.release_date,
    };

    const { response, err } = await favoriteApi.add(body);

    setOnRequest(false);

    if (err) {
      toast.error(err.message);
    }
  };

  return (
    <LoadingButton
      variant="outlined"
      sx={{
        minWidth: "2.2rem",
        height: "2.2rem",
        borderRadius: "50%",
        padding: "0",
        color: "white",
        borderColor: "white",
        span: {
          marginRight: "0px",
        },
        "&:hover ": {
          background: "none",
          borderColor: "white",
        },
      }}
      size="large"
      startIcon={isFavorite ? <FavoriteIcon /> : <AddIcon />}
      loading={onRequest}
      onClick={onFavoriteClick}
    ></LoadingButton>
  );
};

export default ButtonFavorite;
