import express from "express";
import tokenMiddleware from "../middlewares/token.middleware.js";
import reviewController from "../controllers/review.controller.js";

const router = express.Router({ mergeParams: true });

router.post("/", tokenMiddleware.auth, reviewController.createReview);

export default router;
