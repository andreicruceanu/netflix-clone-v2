import favoriteModel from "../models/favorite.model.js";
import responseHandler from "../handlers/response.handler.js";
const addFavorite = async (req, res) => {
  try {
    const isFavorite = await favoriteModel.findOne({
      user: req.user.id,
      id: req.body.id,
    });

    if (isFavorite) {
      return responseHandler.ok(res, isFavorite);
    }
    const favorite = new favoriteModel({
      ...req.body,
      user: req.user.id,
    });
    await favorite.save();

    responseHandler.created(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

const removefavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    const favorite = await favoriteModel.findOne({
      user: req.user.id,
      _id: favoriteId,
    });
    if (!favorite) {
      return responseHandler.notfound(res);
    }

    await favoriteModel.deleteOne(favorite);

    responseHandler.ok(res);
  } catch (error) {
    responseHandler.error(res);
  }
};

const getFavoritesOfUser = async (req, res) => {
  try {
    const favorite = await favoriteModel
      .find({ user: req.user.id })
      .sort("-createdAt");

    responseHandler.ok(res, favorite);
  } catch (error) {
    responseHandler.error(res);
  }
};

export default { addFavorite, getFavoritesOfUser, removefavorite };
