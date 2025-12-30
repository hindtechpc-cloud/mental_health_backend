import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { feelingValidation } from "../middlewares/validations/feelingValidations.js";
import {
  addMentalHealth,
  deleteHealth,
  getMentalHealth,
} from "../controllers/mentalHealthController.js";
const router = express.Router();

router.use(protect);
router.post("/add-feeling", feelingValidation, addMentalHealth);
router.get("/get-feeling", feelingValidation, getMentalHealth);
router.delete("/delete-feeling/:id", deleteHealth);
export const mentalHealthRouter = router;
