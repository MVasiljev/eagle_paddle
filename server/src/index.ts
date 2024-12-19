import dotenv from "dotenv";
import fs from "fs";

const environment = process.env.NODE_ENV || "development";
const envFile = `.env.${environment}`;
let loadedFile = "";

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
  loadedFile = envFile;
} else if (fs.existsSync(".env")) {
  dotenv.config();
  loadedFile = ".env";
}

if (loadedFile) {
  console.log(`Loaded environment file: ${loadedFile}`);
} else {
  console.warn("No .env file found");
}

import startServer from "./server";

startServer();
