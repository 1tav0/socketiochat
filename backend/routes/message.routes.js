import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
// user id of we are chatting with
router.route("/:id").get(authMiddleware, getMessages);
// user id who we would like to send the message to
router.route("/send/:id").post(authMiddleware,sendMessage);

export default router;