import { BufferedFile } from "@/types";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const StorageSchema = new Schema(
  {
    bucket: String,
    filename: String,
    originalname: String,
    create_by: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const StorageModel = mongoose.model("storage", StorageSchema);
