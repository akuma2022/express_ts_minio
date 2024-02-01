import { uploadRouter } from "@/controllers/upload.controller";
import compression from "compression";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";

const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(multer().single("file"));
// init db

// init routes
app.use("/upload", uploadRouter);

export default app;
