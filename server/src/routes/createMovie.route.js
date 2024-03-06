import express from "express";
import createMovieController from "../controllers/createMovie.controller.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import { uploadOptions } from "../utils/multerStorage.js";

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  tokenMiddleware.authAdmin,
  adminMiddleware.verifyAdmin,
  createMovieController.createMovie
);
router.get("/info", createMovieController.getInfo);
router.put(
  "/uploadImages",
  tokenMiddleware.authAdmin,
  adminMiddleware.verifyAdmin,
  uploadOptions,
  createMovieController.uploadImages
);
router.delete(
  "/:movieId",
  tokenMiddleware.authAdmin,
  adminMiddleware.verifyAdmin,
  createMovieController.deleteMovie
);

router.put(
  "/addVideo",
  tokenMiddleware.authAdmin,
  adminMiddleware.verifyAdmin,
  createMovieController.addVideoMovie
);

export default router;
