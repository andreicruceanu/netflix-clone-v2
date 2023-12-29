import express from "express";
import actorController from "../controllers/actor.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/:actorId", actorController.actorDetail);
router.get("/:actorId/medias", actorController.actorMedia);

export default router;
