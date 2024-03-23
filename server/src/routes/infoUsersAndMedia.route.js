import express from "express";
import tokenMiddleware from "../middlewares/token.middleware.js";
import infoUserAndMovieController from "../controllers/infoUserAndMovie.controller.js";

const router = express.Router();

router.get(
  "/users-movies",
  tokenMiddleware.authAdmin,
  infoUserAndMovieController.getInfo
);
router.get(
  "/movieData",
  tokenMiddleware.authAdmin,
  infoUserAndMovieController.movieData
);
router.get(
  "/users",
  tokenMiddleware.authAdmin,
  infoUserAndMovieController.getAllUsersApp
);
router.get(
  "/allMovies",
  tokenMiddleware.authAdmin,
  infoUserAndMovieController.getAllMovies
);
router.get(
  "/movie/:mediaId",
  tokenMiddleware.authAdmin,
  infoUserAndMovieController.getMovie
);
export default router;
