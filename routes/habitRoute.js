import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createHabit, deleteHabit, getHabits, updateHabit } from "../controllers/habitController.js";


const router = express.Router();

router.post("/", protect, createHabit);
router.put("/:id", protect, updateHabit);
router.delete("/:id", protect, deleteHabit);
router.get("/", protect, getHabits);

export const habitRouter=router
