import express from "express";
import userRoute from "./user.route.js";
import mediaRoute from "./media.route.js";
import reviewRoute from "./review.route.js";
import trendingRoute from "./trending.route.js";
import actorRoute from "./actor.route.js";
import searchRoute from "./search.route.js";
import adminRouter from "./admin.route.js";
import createMovieRouter from "./createMovie.route.js";
import infoUserAndMovie from "./infoUsersAndMedia.route.js";
import editMovieRouter from "./editMovie.route.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/admin", adminRouter);
router.use("/trending", trendingRoute);
router.use("/actor", actorRoute);
router.use("/reviews", reviewRoute);
router.use("/:mediaType", mediaRoute);
router.use("/search", searchRoute);
router.use("/admin/createMovie", createMovieRouter);
router.use("/admin/editMovie", editMovieRouter);
router.use("/admin/info", infoUserAndMovie);

export default router;
