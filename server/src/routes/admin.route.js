import express from "express";
import userAdminController from "../controllers/authAdmin.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

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

export default router;
