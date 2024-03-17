import responseHandler from "../handlers/response.handler.js";
import generateToken from "../utils/generateToken.js";
import forgotPasswordTemplate from "../utils/templateMails/ForgotPasswordMail.js";
import userAdminModel from "../models/userAdmin.model.js";
import adminOTPModel from "../models/adminOTPVerification.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import schemaAdminValidate from "../utils/adminValidation.js";
import userModel from "../models/user.model.js";

const createAdmin = async (req, res) => {
  try {
    const { lastName, firstName, email, username, password, role } = req.body;

    const validationResult = schemaAdminValidate.createAdmin({ ...req.body });

    if (validationResult.error) {
      return responseHandler.badrequest(
        res,
        validationResult.error.details[0].message
      );
    }

    const checkEmail = await userAdminModel.findOne({ email });

    if (checkEmail) {
      return responseHandler.badrequest(
        res,
        "The email already exists. Add another email address!"
      );
    }

    const checkUsername = await userAdminModel.findOne({ username });

    if (checkUsername) {
      return responseHandler.badrequest(
        res,
        "The username exists. Add another username!"
      );
    }

    const admin = new userAdminModel();

    admin.firstName = firstName;
    admin.lastName = lastName;
    admin.username = username;
    admin.email = email;
    admin.setPassword(password);
    admin.role = role;

    await admin.save();

    responseHandler.created(res, {
      message: "The account has been created",
    });
  } catch (error) {
    responseHandler.error(res);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { password } = req.body;

    const username = req.body.username.toLowerCase();

    const validationResult = schemaAdminValidate.login({ ...req.body });

    if (validationResult.error) {
      return responseHandler.badrequest(
        res,
        validationResult.error.details[0].message
      );
    }

    const admin = await userAdminModel
      .findOne({ username })
      .select(
        "id , username , email , password , salt , role , isActive ,  twoFactorAuth"
      );

    if (!admin) {
      return responseHandler.badrequest(res, "Incorrect email or password");
    }
    if (!admin.validPassword(password)) {
      return responseHandler.badrequest(res, "Wrong password");
    }

    const token = generateToken(admin.id);

    admin.password = undefined;
    admin.salt = undefined;
    responseHandler.ok(res, { ...admin._doc, token });
  } catch (error) {
    responseHandler.error(res);
  }
};

const sendOTPVerification = async (req, res) => {
  try {
    const { email } = req.params;

    const isRequestExisting = await adminOTPModel.findOne({
      email,
      userId: req.user.id,
    });

    if (email !== req.user.email) {
      return responseHandler.badrequest(res, "Email is not correct");
    }

    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;

    if (isRequestExisting) {
      isRequestExisting.hashOTP(otp);
      const hashedOTP = isRequestExisting.otp;
      const result = await adminOTPModel.findByIdAndUpdate(
        isRequestExisting._id,
        {
          $set: {
            otp: hashedOTP,
            salt: isRequestExisting.salt,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
          },
        },
        { new: true }
      );
      if (!result) {
        return responseHandler.notfound(res);
      }

      const content = `<p> Enter <b>${otp} in the app.`;

      await sendEmail(
        email,
        "Security code to access the Admin Panel account",
        content
      );
      return responseHandler.ok(res, { email });
    }

    const newOTPVerification = new adminOTPModel({
      userId: req.user.id,
      otp: otp,
      email,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    newOTPVerification.hashOTP(otp);

    await newOTPVerification.save();

    const subject = "Security code to access the Admin Panel account";

    const content = `<p> Enter <b>${otp} in the app.`;

    await sendEmail(email, subject, content);

    responseHandler.ok(res, { email });
  } catch (error) {
    responseHandler.error(res);
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { code } = req.params;

    if (isNaN(code)) {
      return responseHandler.badrequest(res, "The code must be a number");
    }

    const userOTPVerification = await adminOTPModel.findOne({
      userId: req.user.id,
      email: req.user.email,
    });

    if (!userOTPVerification) {
      return responseHandler.notfound(res);
    }

    if (!userOTPVerification.verifyOTP(code)) {
      return responseHandler.unauthorize(res, "The code is invalid", false);
    }

    if (userOTPVerification.expiresAt < Date.now()) {
      return responseHandler.unauthorize(
        res,
        "Code has expired. Plase try again",
        false
      );
    }

    responseHandler.ok(res, { message: "The 2FA code is valid", result: true });
  } catch (error) {
    responseHandler.error(res);
  }
};

const sendResetPasswordLink = async (req, res) => {
  const email = req.body.email.toLowerCase();
  try {
    const validationResult = schemaAdminValidate.forgotPasswordCheckEmail({
      ...req.body,
    });

    if (validationResult.error) {
      return responseHandler.badrequest(
        res,
        validationResult.error.details[0].message
      );
    }

    const userCheck = await userAdminModel.findOne({ email });

    if (!userCheck) {
      return responseHandler.badrequest(res, "Email not exist !");
    }

    const token = generateToken(userCheck.id);

    await sendEmail(
      userCheck.email,
      "Password Reset",
      forgotPasswordTemplate(userCheck.firstName, token)
    );
    responseHandler.ok(res, {
      message: "Email password reset has been sent.",
      result: true,
    });
  } catch (error) {
    responseHandler.error(res);
  }
};

const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  try {
    const validationResult = schemaAdminValidate.resetPassword({
      ...req.body,
    });

    if (validationResult.error) {
      return responseHandler.badrequest(
        res,
        validationResult.error.details[0].message
      );
    }

    const admin = await userAdminModel
      .findById(req.userId)
      .select("password salt id");

    if (!admin) {
      return responseHandler.unauthorize(res, "Admin not found !", false);
    }

    admin.setPassword(newPassword);

    await admin.save();

    responseHandler.ok(res, { result: true });
  } catch (error) {
    responseHandler.error(res);
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!req.params.userId) {
      return responseHandler.badrequest(res, "userId is required");
    }
    const deleteUser = await userModel.findByIdAndDelete(req.params.userId);

    responseHandler.ok(res, deleteUser);
  } catch (error) {
    responseHandler.error(res);
  }
};

const editUser = async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email } = req.body;
  if (!userId) {
    return responseHandler.badrequest(res, "userId is required");
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return responseHandler.badrequest(res, "User not exist!");
    }

    const checkEmail = await userModel.findOne({ email });

    if (checkEmail && checkEmail._id.toString() !== userId) {
      return responseHandler.badrequest(
        res,
        "The email already exists. Add another email address!"
      );
    }

    const updateUser = await userModel.findByIdAndUpdate(
      { _id: userId },
      { firstName, lastName, email },
      {
        new: true,
      }
    );

    return responseHandler.ok(res, updateUser);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  createAdmin,
  loginAdmin,
  sendOTPVerification,
  verifyOTP,
  sendResetPasswordLink,
  resetPassword,
  deleteUser,
  editUser,
};
