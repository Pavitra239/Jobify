import "express-async-errors"; // avoids app crashing for async errors
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { nanoid } from "nanoid";

// Routes
import jobRouter from "./routes/jobRouter.js";

// middlewares
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { BadRequestError } from "./errors/customErrors.js";

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Job Routes
app.use("/api/v1/jobs", jobRouter);

// 404
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log("Server started on port 5100");
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
