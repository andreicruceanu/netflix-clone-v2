import express from "express";
import userController from "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router();

router.post("/signup", userController.signup);

export default router;
