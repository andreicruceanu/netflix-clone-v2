import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";
import userAdminModel from "../models/userAdmin.model.js";

const bearerTokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      return jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
    }
    return false;
  } catch (error) {
    return false;
  }
};

const bodyTokenDecode = (token) => {
  try {
    if (token) {
      return jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
    }
    return false;
  } catch (error) {
    return false;
  }
};

const auth = async (req, res, next) => {
  const tokenDecoded = bearerTokenDecode(req);

  if (!tokenDecoded)
    return responseHandler.unauthorize(
      res,
      "Authentication required. Please log in to access this resource.",
      false
    );

  const user = await userModel.findById(tokenDecoded.data);

  if (!user)
    return responseHandler.unauthorize(
      res,
      "Authentication required. Please log in to access this resource.",
      false
    );

  req.user = user;

  next();
};

const authAdmin = async (req, res, next) => {
  const tokenDecoded = bearerTokenDecode(req);

  if (!tokenDecoded)
    return responseHandler.unauthorize(
      res,
      "Authentication required. Please log in to access this resource.",
      false
    );

  const user = await userAdminModel.findById(tokenDecoded.data);

  if (!user)
    return responseHandler.unauthorize(
      res,
      "Authentication required. Please log in to access this resource.",
      false
    );

  req.user = user;

  next();
};

const createAdmin = async (req, res, next) => {
  if (!req.user) {
    return responseHandler.unauthorize(res, "User not exist !", false);
  }

  if (req.user.role !== "owner") {
    return responseHandler.unauthorize(
      res,
      "You cannot create admins because you are not the owner!",
      false
    );
  }

  next();
};

const verifyTokenResetPassword = async (req, res, next) => {
  const tokenDecoded = bodyTokenDecode(req.body.token);
  if (!tokenDecoded)
    return responseHandler.unauthorize(res, "Token is invalid", false);

  req.userId = tokenDecoded.data;
  next();
};

export default {
  auth,
  bearerTokenDecode,
  createAdmin,
  authAdmin,
  verifyTokenResetPassword,
};
