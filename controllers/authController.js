import { validationResult } from "express-validator";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  //   const result = validationResult(req);
  //   if (!result.isEmpty()) {
  //     return res.status(400).json({
  //       message: "All fields are required",
  //       errors: result.array(), // cleaner and safer
  //     });
  //   }

  if (req.body == null) {
    return res.status(422).json({
      message: "all fields are required",
    });
  }

  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  let user;
  try {
    user = await User.create({
      ...req.body,
      password: hashedPassword,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
  let token;
  try {
    token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );
  } catch (error) {}

  return res.status(201).json({
    message: "account created successfully",
    user: user,
    token,
  });
};
