import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";
import validateDataFromUser from "../utils/userValidation.js";
import generateToken from "../utils/generateToken.js";

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

    const checkUser = await userModel.findOne({ email });

    if (checkUser) {
      return responseHandler.badrequest(
        res,
        "The email already exists. Add another email address!"
      );
    }

    const user = new userModel();

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.setPassword(password);

    await user.save();

    const token = generateToken(user.id);

    responseHandler.created(res, {
      ...user._doc,
      id: user.id,
      token,
    });
  } catch (error) {
    responseHandler.error(res);
  }
};

export default { signup };
