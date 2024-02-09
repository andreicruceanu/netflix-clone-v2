import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";
import validateDataFromUser from "../utils/userValidation.js";
import generateToken from "../utils/generateToken.js";
import userAdminModel from "../models/userAdmin.model.js";
import adminOTPModel from "../models/AdminOTPVerification.model.js";
import { sendEmail } from "../utils/sendEmail.js";

const createAdmin = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;
    //
    // const validationResult = validateDataFromUser.signup({ ...req.body });

    // if (validationResult.error) {
    //   return responseHandler.badrequest(
    //     res,
    //     validationResult.error.details[0].message
    //   );
    // }

    const checkAdmin = await userAdminModel.findOne({ email });

    if (checkAdmin) {
      return responseHandler.badrequest(
        res,
        "The email already exists. Add another email address!"
      );
    }

    const admin = new userAdminModel();

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
    const { username, password } = req.body;

    // const validationResult = validateDataFromUser.signin({ ...req.body });

    // if (validationResult.error) {
    //   return responseHandler.badrequest(
    //     res,
    //     validationResult.error.details[0].message
    //   );
    // }

    const admin = await userAdminModel
      .findOne({ username })
      .select(
        "id , username , email , password , salt , role , isActive ,  twoFactorAuth"
      );

    if (!admin) {
      return responseHandler.badrequest(res, "Admin not exist!");
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
      const result = await adminOTPModel.findByIdAndUpdate(
        isRequestExisting._id,
        {
          $set: {
            otp: isRequestExisting.otp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
          },
        },
        { new: true }
      );
      if (!result) {
        return responseHandler.notfound(res);
      }
      const subject = "Security code to access the Admin Panel account";

      const content = `<p> Enter <b>${otp} in the app.`;

      await sendEmail(email, subject, content);
      return responseHandler.ok(res, { email });
    }

    const newOTPVerification = await new adminOTPModel({
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
    console.log(userOTPVerification);
    if (!userOTPVerification) {
      console.log("a");
      return responseHandler.notfound(res);
    }

    if (userOTPVerification.expiresAt < Date.now()) {
      console.log("b");
      return responseHandler.unauthorize(
        res,
        "Code has expired. Plase try again",
        false
      );
    }

    if (!userOTPVerification.verifyOTP(code)) {
      console.log(!userOTPVerification.verifyOTP(code));
      return responseHandler.unauthorize(res, "The code is invalid", false);
    }

    responseHandler.ok(res, { message: "The 2FA code is valid", result: true });
  } catch (error) {}
};

export default {
  createAdmin,
  loginAdmin,
  sendOTPVerification,
  verifyOTP,
};
