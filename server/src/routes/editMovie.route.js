import express from "express";
import createMovieController from "../controllers/createMovie.controller.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import { uploadOptions } from "../utils/multerStorage.js";

const router = express.Router({ mergeParams: true });

router.put(
  "/newImage",
  tokenMiddleware.authAdmin,
  adminMiddleware.verifyAdmin,
  uploadOptions,
  createMovieController.editMovieWithImages
);

export default router;
