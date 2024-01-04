import { useDispatch } from "react-redux";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import favoriteApi from "../api/modules/favorite.api";
import { addFavorite, removeFavorite } from "../redux/features/userSlice";
import { toast } from "react-toastify";

export const useFavorites = () => {
  const dispatch = useDispatch();

  const handleFavoriteAction = async (
    user,
    media,
    mediaType,
    listFavorites,
    setIsFavorite,
    setOnRequest
  ) => {
    if (!user) {
      return dispatch(setAuthModalOpen(true));
    }

    setOnRequest(true);

    const body = {
      ...media,
      mediaType: mediaType,
    };

    const favorite = listFavorites.find(
      (e) => e.id.toString() === media.id.toString()
    );

    let response, err;

    if (favorite) {
      ({ response, err } = await favoriteApi.remove({
        favoriteId: favorite._id,
      }));
    } else {
      ({ response, err } = await favoriteApi.add(body));
    }

    setOnRequest(false);

    if (err) {
      toast.error(err.message);
    }

    if (response) {
      if (favorite) {
        dispatch(removeFavorite(favorite));
      } else {
        dispatch(addFavorite(response));
      }

      setIsFavorite((prev) => !prev);
      toast.success(
        favorite ? "Remove favorite success" : "Add favorite success"
      );
    }
  };

  return {
    handleFavoriteAction,
  };
};
