import responseHandler from "../handlers/response.handler.js";

const verifyAdmin = async (req, res, next) => {
  if (!req.user) {
    return responseHandler.unauthorize(res, "User not exist !", false);
  }

  if (req.user.role !== "admin" && req.user.role !== "owner") {
    return responseHandler.unauthorize(
      res,
      "Access denied: Admin privileges required to perform this action",
      false
    );
  }

  next();
};

export default {
  verifyAdmin,
};
