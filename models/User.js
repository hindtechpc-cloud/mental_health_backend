import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"] },
    email: {
      type: String,
      required: [true, "please enter your email"],
      unique: [true, "This email already exist"],
    },
    password: {
      type: String,
      required: [true, "please eneter your pssword"],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("user", userSchema);
