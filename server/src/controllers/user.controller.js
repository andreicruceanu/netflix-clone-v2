import responseHandler from "../handlers/response.handler.js";
import validateDataFromUser from "../utils/userValidation.js";

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const validationResult = validateDataFromUser.signup({ ...req.body });

    if (validationResult.error) {
      return responseHandler.badrequest(
        res,
        validationResult.error.details[0].message
      );
    }

    return res.status(200).json({});
  } catch (error) {}
};

export default { signup };
