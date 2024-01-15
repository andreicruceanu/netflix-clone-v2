import express from "express";
import mediaController from "../controllers/media.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/genres", mediaController.getGenres);
router.get("/:mediaCategory", mediaController.getList);
router.get("/:mediaId/officialTrailer", mediaController.getTrailerMovie);
router.get("/:mediaId/moreDetails", mediaController.getMoreInfoMedia);
router.get("/:mediaId/similar", mediaController.similarMovies);
router.get("/:mediaCategory/heroMedia", mediaController.heroMovie);
router.get("/detail/:mediaId", mediaController.getDetail);
router.get("/discover/:genreId", mediaController.discover);

export default router;
