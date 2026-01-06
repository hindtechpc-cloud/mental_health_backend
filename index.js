import express from "express";
import { authRouter } from "./routes/authRoute.js";
import { connectDB } from "./config/db.js";
import { mentalHealthRouter } from "./routes/mentahealthRoute.js";
import cors from "cors";
import { habitRouter } from "./routes/habitRoute.js";
import path from "path"
import { chatRouter } from "./routes/chatRoute.js";
const app = express();
const port = 4000;


app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(cors());
connectDB();

app.get("/health", (req, res) => {
  return res.status(200).json({
    message: "ok",
  });
});
app.use("/api/chat",chatRouter);

app.use("/api",authRouter);
app.use("/api",mentalHealthRouter);
app.use("/api/habit",habitRouter);
app.use("/api/chat",chatRouter);

app.listen(port, () => {
  console.log("server is running on port ", port);
});
