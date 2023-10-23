import responseHandler from "../handlers/response.handler.js";
import preferencesModel from "../models/preferences.model.js";
import validateDataFromUser from "../utils/userValidation.js";

const preferences = async (req, res) => {
  try {
    const { mediaId, mediaType } = req.body;
    const type = req.query.type;
    const userId = req.user.id;

    const validationResult = validateDataFromUser.preferences({
      type,
      mediaId,
      mediaType,
    });

    if (validationResult.error) {
      return responseHandler.badrequest(
        res,
        validationResult.error.details[0].message
      );
    }

    const isEvaluated = await preferencesModel.findOne({
      userId: req.user.id,
      mediaId,
    });

    if (isEvaluated) {
      if (type === "like") {
        await preferencesModel.updateOne(
          { _id: isEvaluated.id },
          { $set: { isLiked: true, isDisliked: false } }
        );
        return responseHandler.noContent(res);
      } else if (type === "dislike") {
        await preferencesModel.updateOne(
          { _id: isEvaluated.id },
          { $set: { isLiked: false, isDisliked: true } }
        );
        return responseHandler.noContent(res);
      } else if (type === "none") {
        await preferencesModel.deleteOne({ _id: isEvaluated.id });
        return responseHandler.noContent(res);
      }
    } else {
      const newPreference = new preferencesModel({
        userId,
        mediaId,
        mediaType,
        isLiked: type === "like" ? true : false,
        isDisliked: type === "dislike" ? true : false,
        ...req.body,
      });
      await newPreference.save();
      responseHandler.created(res, newPreference);
    }
  } catch (error) {
    responseHandler.error(res);
  }
};

const getPreferences = async (req, res) => {
  try {
    const preferences = await preferencesModel.find({ userId: req.user.id });

    responseHandler.ok(res, preferences);
  } catch (error) {
    responseHandler.error(res);
  }
};

export default { preferences, getPreferences };
