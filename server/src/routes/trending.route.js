import express from "express";
import mediaController from "../controllers/media.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/:mediaType/:time", mediaController.getTrendingList);

export default router;
