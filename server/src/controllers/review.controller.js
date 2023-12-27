import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";
import validateDataFromUser from "../utils/userValidation.js";

const createReview = async (req, res) => {
  try {
    const validationResult = validateDataFromUser.createReview({ ...req.body });

    if (validationResult.error) {
      return responseHandler.badrequest(
        res,
        validationResult.error.details[0].message
      );
    }

    const review = new reviewModel({ user: req.user.id, ...req.body });

    await review.save();

    responseHandler.created(res, {
      ...review._doc,
      id: review.id,
      user: req.user,
    });
  } catch {
    responseHandler.error(res);
  }
};
export default {
  createReview,
};
