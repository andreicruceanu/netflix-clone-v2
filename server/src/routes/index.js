import express from "express";
import userRoute from "./user.route.js";
import mediaRoute from "./media.route.js";
import trendingRoute from "./trending.route.js";
const router = express.Router();

router.use("/user", userRoute);
router.use("/trending", trendingRoute);
router.use("/:mediaType", mediaRoute);

export default router;
