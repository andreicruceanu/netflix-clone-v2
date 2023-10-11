import express from "express";
import mediaController from "../controllers/media.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/genres", mediaController.getGenres);
router.get("/:mediaCategory", mediaController.getList);
router.get("/:mediaId/officialTrailer", mediaController.getTrailerMovie);
router.get("/:mediaId/moreDetails", mediaController.getMoreInfoMedia);
export default router;
