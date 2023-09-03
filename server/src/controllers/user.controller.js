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

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validationResult = validateDataFromUser.signin({ ...req.body });

    if (validationResult.error) {
      return responseHandler.badrequest(
        res,
        validationResult.error.details[0].message
      );
    }

    const user = await userModel
      .findOne({ email })
      .select("firstName lastName salt id email password");

    if (!user) {
      return responseHandler.badrequest(res, "User not exist!");
    }
    if (!user.validPassword(password)) {
      return responseHandler.badrequest(res, "Wrong password");
    }

    const token = generateToken(user.id);

    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, { ...user._doc, id: user.id, token });
  } catch (error) {
    responseHandler.error(res);
  }
};

export default { signup, signin };
