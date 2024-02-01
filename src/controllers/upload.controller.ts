import { storage } from "@/config/minio";
import { Router } from "express";
import multer from "multer";

const upload = multer({ storage: storage });

export const uploadRouter = Router();

uploadRouter.get("/", (req, res) => {
  res.json({ json: { test: "test" } });
});
