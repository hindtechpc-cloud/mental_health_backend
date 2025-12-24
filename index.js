import express from "express";
import { authRouter } from "./routes/authRoute.js";
import { connectDB } from "./config/db.js";

const app = express();
const port = 4000;

app.use(express.json());


connectDB();

app.get("/health", (req, res) => {
  return res.status(200).json({
    message: "ok",
  });
});
app.use("/api",authRouter);

app.listen(port, () => {
  console.log("server is running on port ", port);
});
