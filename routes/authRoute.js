import express from "express";
import {
  login,
  register,
  updateProfile,
} from "../controllers/authController.js";
import {
  loginValidations,
  registerValidations,
} from "../middlewares/validations/authValidation.js";
import { protect } from "../middlewares/authMiddleware.js";
import { User } from "../models/User.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/register", registerValidations, register);
router.post("/login", loginValidations, login);
router.put("/update-profile", protect, upload("pic"), updateProfile);
router.post("/check", protect, async (req, res) => {
  try {
    const user = await User.findById(req.decoded).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "auth",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

export const authRouter = router;
