import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import favoriteApi from "../../api/modules/favorite.api";

import { addFavorite, removeFavorite } from "../../redux/features/userSlice";
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
    if (isFavorite) {
      onRemoveFavorite();
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
      mediaReleaseDate: media.release_date || media.first_air_date,
    };

    const { response, err } = await favoriteApi.add(body);
    setOnRequest(false);

    if (err) {
      toast.error(err.message);
    }

    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      toast.success("Add favorite success");
    }
  };

  const onRemoveFavorite = async () => {
    if (onRequest) {
      return;
    }

    setOnRequest(true);

    const favorite = listFavorites.find(
      (e) => e.mediaId.toString() === media.id.toString()
    );

    const { response, err } = await favoriteApi.remove({
      favoriteId: favorite.id,
    });
    setOnRequest(false);

    if (err) {
      toast.error(err.message);
    }

    if (response) {
      dispatch(removeFavorite(favorite));
      setIsFavorite(false);
      toast.success("Remove favorite succes");
    }
  };

  useEffect(() => {
    const favorite = listFavorites.find(
      (e) => e.mediaId.toString() === media.id.toString()
    );
    if (favorite) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [listFavorites, media.id]);

  return (
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
      startIcon={isFavorite ? <FavoriteIcon /> : <AddIcon />}
      loading={onRequest}
      onClick={onFavoriteClick}
    ></LoadingButton>
  );
};

export default ButtonFavorite;
