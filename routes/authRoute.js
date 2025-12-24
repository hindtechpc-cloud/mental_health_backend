import express from "express";
import { register } from "../controllers/authController.js";
import { registerValidations } from "../middlewares/validations/authValidation.js";

const router = express.Router();

router.post("/register", register);

export const authRouter = router;
