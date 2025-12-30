import { validationResult } from "express-validator";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({
      message: "unprocessabale entity",
      errors: result.array(), // cleaner and safer
    });
  }

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
      process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
  } catch (error) {
    return res.status(500).json({
      message: "server error ",
      error: error.message,
    });
  }

  return res.status(201).json({
    message: "account created successfully",
    user: user,
    token,
  });
};



export const login = async (req, res) => {
  // 1. Validate request
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({
      message: "Unprocessable entity",
      errors: result.array(),
    });
  }

  const { email, password } = req.body;

  try {
    // 2. Find user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 3. Compare password
    const isPasswordMatched = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatched) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 4. Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Remove password before sending user
    user.password = undefined;

    // 6. Send response
    return res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


