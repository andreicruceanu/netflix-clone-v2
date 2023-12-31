import express from "express";
import userController from "../controllers/user.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import favoriteController from "../controllers/favorite.controller.js";
import preferencesController from "../controllers/preferences.controller.js";

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.put(
  "/update-password",
  tokenMiddleware.auth,
  userController.updatePassword
);
router.put(
  "/changeEmail",
  tokenMiddleware.auth,
  userController.changeEmailUser
);
router.post("/update", tokenMiddleware.auth, userController.updateProfileUser);
router.get("/info", tokenMiddleware.auth, userController.getInfoUser);
router.post("/favorites", tokenMiddleware.auth, favoriteController.addFavorite);
router.get(
  "/favorites",
  tokenMiddleware.auth,
  favoriteController.getFavoritesOfUser
);
router.delete(
  "/favorites/:favoriteId",
  tokenMiddleware.auth,
  favoriteController.removefavorite
);
router.post(
  "/preferences",
  tokenMiddleware.auth,
  preferencesController.preferences
);
router.get(
  "/getPreferences",
  tokenMiddleware.auth,
  preferencesController.getPreferences
);

export default router;
