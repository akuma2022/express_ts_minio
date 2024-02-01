import * as minio from "minio";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

export const minioClient = new minio.Client({
  endPoint: process.env.MINIO_ENDPOINT as string,
  port: parseInt(process.env.MINIO_PORT || "9000"),
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ACCESS_KEY as string,
  secretKey: process.env.MINIO_SECRET_KEY as string,
});

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uuidv4() + "-" + file.originalname);
  },
});
