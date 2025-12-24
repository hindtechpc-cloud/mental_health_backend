import mongoose from "mongoose";
import "dotenv/config";
export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_DB_URI);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
