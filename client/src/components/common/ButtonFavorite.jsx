import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import favoriteApi from "../../api/modules/favorite.api";
import CheckIcon from "@mui/icons-material/Check";
import { addFavorite, removeFavorite } from "../../redux/features/userSlice";
import { toast } from "react-toastify";
import TooltipNetflix from "./TooltipNetflix";
import { PREFERENCES } from "../../utils/constants";
import { useFavorites } from "../../hook/useFavorite";
import { Button, useMediaQuery } from "@mui/material";

const ButtonFavorite = ({ media, mediaType }) => {
  const { user, listFavorites } = useSelector((state) => state.user);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);

  const { handleFavoriteAction } = useFavorites();

  const onFavoriteClick = () => {
    handleFavoriteAction(
      user,
      media,
      mediaType,
      listFavorites,
      setIsFavorite,
      setOnRequest
    );
  };

  useEffect(() => {
    const favorite = listFavorites.find(
      (e) => e.id.toString() === media.id.toString()
    );
    if (favorite) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [listFavorites, media]);

  console.log(isFavorite);

  return isMobile ? (
    <LoadingButton
      variant="contained"
      loading={onRequest}
      startIcon={isFavorite ? <CheckIcon /> : <AddIcon />}
      onClick={onFavoriteClick}
      color={isFavorite ? "success" : "primary"}
      sx={{ color: "white", padding: 1.3 }}
      size="small"
      fullWidth
    >
      {isFavorite ? "Added" : "Add to My List"}
    </LoadingButton>
  ) : (
    <TooltipNetflix
      title={isFavorite ? PREFERENCES.removeFavorite : PREFERENCES.addFavorite}
    >
      <LoadingButton
        variant="text"
        sx={{
          minWidth: "100%",
          padding: 1.5,
          borderRadius: "50%",
          color: "white",
          span: {
            marginRight: "0px",
            marginLeft: "0px",
          },
          "&:hover": {
            border: "none",
            background: "none",
          },
          "& .MuiSvgIcon-root": {
            fontSize: 30,
          },
        }}
        size="large"
        startIcon={isFavorite ? <FavoriteIcon /> : <AddIcon />}
        loading={onRequest}
        onClick={onFavoriteClick}
      ></LoadingButton>
    </TooltipNetflix>
  );
};

export default ButtonFavorite;
