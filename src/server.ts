import "module-alias/register";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

import app from "@/routers";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
