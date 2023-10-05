import favoriteModel from "../models/favorite.model.js";
import responseHandler from "../handlers/response.handler.js";
const addFavorite = async (req, res) => {
  try {
    const isFavorite = await favoriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
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
    return res.send(200);
  } catch (error) {
    responseHandler.error(res);
  }
};

const removefavorite = async (req, res) => {
  try {
  } catch (error) {}
};

export default { addFavorite };
