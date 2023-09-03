import express from "express";
import userController from "../controllers/user.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.put(
  "/update-password",
  tokenMiddleware.auth,
  userController.updatePassword
);

export default router;
