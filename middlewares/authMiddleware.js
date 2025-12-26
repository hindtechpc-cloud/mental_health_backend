import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/User.js";
export const protect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    let decoded;
    try {
      decoded = jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.JWT_SECRET
      );
    } catch (error) {
      res.json({
        message: "invalid token",
        error: error.message,
      });
    }
    let user;
    try {
      user = await User.findById(decoded.id);
    } catch (error) {
      res.json({
        message: "error to find user at authenticeton",
      });
    }
    if (!user || user == null) {
      res.json({
        message: "user not fount at authenticeton",
      });
    }
    req.decoded = decoded.id;
    next();
  } else {
    res.json({
      message: "invalid token",
    });
    next();
  }
};
