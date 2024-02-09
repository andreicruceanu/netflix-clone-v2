import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";
import userAdminModel from "../models/userAdmin.model.js";

const tokenDecode = (req) => {
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

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);

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
  const tokenDecoded = tokenDecode(req);

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

export default { auth, tokenDecode, authAdmin };
