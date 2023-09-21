import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
const ButtonFavorite = ({
  mediaId,
  mediaTitle,
  mediaType,
  mediaPoster,
  mediaRate,
}) => {
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
      mediaId,
      mediaTitle,
      mediaType,
      mediaPoster,
      mediaRate,
    };
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
        "&.MuiButton-startIcon": {
          marginRight: "0px",
        },
        "&:hover ": {
          background: "none",
          borderColor: "white",
        },
      }}
      loadingPosition="end"
      size="large"
      startIcon={isFavorite ? <FavoriteIcon /> : <AddIcon />}
      loading={onRequest}
      onClick={onFavoriteClick}
    ></LoadingButton>
  );
};

export default ButtonFavorite;
