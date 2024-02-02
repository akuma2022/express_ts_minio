import "module-alias/register";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

import app from "@/routers";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;

const main = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydb");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }

  app.listen(port, () => {
    console.log(`running on port ${port}`);
  });
};

main();
