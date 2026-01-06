import express from "express";
import { geminiChatController } from "../controllers/chat.js";

const router = express.Router();

router.post("/", geminiChatController);

export const chatRouter=router;
