import express from "express";
import userAdminController from "../controllers/authAdmin.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import authAdminController from "../controllers/authAdmin.controller.js";

const router = express.Router();
router.post(
  "/create",
  tokenMiddleware.authAdmin,
  tokenMiddleware.createAdmin,
  userAdminController.createAdmin
);

router.post("/login", userAdminController.loginAdmin);
router.post(
  "/2FAmail/:email",
  tokenMiddleware.authAdmin,
  userAdminController.sendOTPVerification
);
router.post(
  "/2FAverify/:code",
  tokenMiddleware.authAdmin,
  userAdminController.verifyOTP
);
router.post("/resetPassword", userAdminController.sendResetPasswordLink);
router.post(
  "/confirmResetPassword",
  tokenMiddleware.verifyTokenResetPassword,
  userAdminController.resetPassword
);
router.post(
  "/changePassword",
  tokenMiddleware.authAdmin,
  userAdminController.changePassword
);

router.patch(
  "/updateAdmin",
  tokenMiddleware.authAdmin,
  authAdminController.updateAdmin
);

router.delete(
  "/deleteUser/:userId",
  tokenMiddleware.authAdmin,
  adminMiddleware.verifyAdmin,
  userAdminController.deleteUser
);

router.patch(
  "/updateProfile/:userId",
  tokenMiddleware.authAdmin,
  adminMiddleware.verifyAdmin,
  userAdminController.editUser
);

export default router;
