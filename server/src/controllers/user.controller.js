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
      .select("firstName lastName salt id email password profilePicture");

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

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, password } = req.body;

    const validationResult = validateDataFromUser.updatePassowrd({
      ...req.body,
    });

    if (validationResult.error) {
      return responseHandler.badrequest(
        res,
        validationResult.error.details[0].message
      );
    }
    const user = await userModel
      .findById(req.user.id)
      .select("password salt id");

    if (!user) {
      return responseHandler.unauthorize(res);
    }

    if (!user.validPassword(oldPassword)) {
      return responseHandler.badrequest(res, "You entered the wrong password.");
    }

    user.setPassword(password);

    await user.save();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getInfoUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return responseHandler.notfound(res);
    }
    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};

const updateProfileUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return responseHandler.notfound(res);
    }

    const validationResult = validateDataFromUser.updateUser({
      ...req.body,
    });

    if (validationResult.error) {
      return responseHandler.badrequest(
        res,
        validationResult.error.details[0].message
      );
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          profilePicture: req.body.profilePicture,
        },
      },
      {
        new: true,
        select: "-password",
      }
    );

    responseHandler.ok(res, { ...updatedUser._doc, id: updatedUser._id });
  } catch (error) {
    responseHandler.error(res);
  }
};

const changeEmailUser = async (req, res) => {
  try {
    const { oldEmail, newEmail, password } = req.body;

    const validationResult = validateDataFromUser.changeEmail({
      ...req.body,
    });

    if (validationResult.error) {
      return responseHandler.badrequest(
        res,
        validationResult.error.details[0].message
      );
    }

    console.log("a");

    const user = await userModel
      .findOne({ email: oldEmail })
      .select("firstName lastName salt id email password profilePicture");

    if (!user) {
      return responseHandler.badrequest(res, "User not exist!");
    }
    if (!user.validPassword(password)) {
      return responseHandler.badrequest(res, "Wrong password");
    }

    const emailExist = await userModel.findOne({ email: newEmail });

    if (emailExist) {
      return responseHandler.badrequest(
        res,
        "Email already registered. Use another!"
      );
    }

    const updateEmail = await userModel.findByIdAndUpdate(
      user.id,
      {
        $set: {
          email: newEmail,
        },
      },
      {
        new: true,
        select: "-password -salt",
      }
    );
    console.log(updateEmail);

    responseHandler.ok(res, { ...updateEmail._doc, id: updateEmail._id });
  } catch (err) {
    responseHandler.error(res);
  }
};

export default {
  signup,
  signin,
  updatePassword,
  getInfoUser,
  updateProfileUser,
  changeEmailUser,
};
