import { uploadRouter } from "@/controllers/upload.controller";
import compression from "compression";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import multer from "multer";

const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init routes
app.use("/", uploadRouter);

export default app;
