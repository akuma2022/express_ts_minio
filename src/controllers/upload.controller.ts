import { minioClient, storage } from "@/config/minio";
import { Router } from "express";
import { Readable } from "stream";
import multer from "multer";
import * as fs from "fs";
import { BufferedFile } from "@/types";
import { StorageModel } from "@/schema";

const minio_host = process.env.MINIO_ENDPOINT;
const minio_port = parseInt(process.env.MINIO_PORT || "9000");
const minio_protocol = process.env.MINIO_USE_SSL === "true" ? "https" : "http";

export const uploadRouter = Router();

uploadRouter.get(":slug", (req, res) => {
  const slug = req.params.slug;

  // minioClient.getObject(bucketName, fileName, (error, dataStream) => {
  //   if (error) {
  //     console.log("Error downloading object:", error);
  //     res.status(500).send("Error downloading object from MinIO");
  //   } else {
  //     res.setHeader("Content-Type", "video/mp4");
  //     dataStream.pipe(res);
  //   }
  // });
});

const upload = multer({ storage: storage });

uploadRouter.post("/", upload.single("file"), async (req, res) => {
  const file = req.file as BufferedFile | undefined;
  const cluster = req.body.cluster as string | undefined;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  if (!cluster) {
    return res.status(400).json({ error: "No clusters config" });
  }

  const fileStream = fs.createReadStream(file.path);

  minioClient.putObject(
    cluster,
    file.filename,
    fileStream,
    async (err, { etag, versionId }) => {
      if (err) {
        fileStream.destroy();

        fs.unlink(file.path, (err) => {
          if (err) {
            console.error(err);
          }
        });

        return res.status(500).json({ error: err.message });
      }

      const result = await new StorageModel({
        bucket: cluster,
        filename: file.filename,
        originalname: file.originalname,
      }).save();

      fileStream.destroy();

      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(err);
        }
      });

      res.status(201).json({ ...result.toJSON(), etag });
    }
  );
});
