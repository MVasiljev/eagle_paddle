import dotenv from "dotenv";

dotenv.config();

const ENV = {
  MONGO_URI: process.env.MONGO_URI || "",
  DATABASE_NAME: process.env.DATABASE_NAME || "",
  PORT: process.env.PORT || 5002,
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};

export default ENV;
