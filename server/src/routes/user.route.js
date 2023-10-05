import express from "express";
import userController from "../controllers/user.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import favoriteController from "../controllers/favorite.controller.js";

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.put(
  "/update-password",
  tokenMiddleware.auth,
  userController.updatePassword
);
router.get("/info", tokenMiddleware.auth, userController.getInfoUser);
router.post("/favorites", tokenMiddleware.auth, favoriteController.addFavorite);

export default router;
