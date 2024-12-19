import mongoose from "mongoose";
import logger from "../logger";
import ENV from "../env";

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;

const connectDB = async () => {
  const { MONGO_URI, DATABASE_NAME } = ENV;

  if (!MONGO_URI) {
    logger.error("MONGO_URI is not defined in the configuration.");
    throw new Error("MONGO_URI is missing.");
  }

  const fullMongoURI = DATABASE_NAME
    ? `${MONGO_URI}/${DATABASE_NAME}`
    : MONGO_URI;

  if (!DATABASE_NAME) {
    logger.warn(
      "DATABASE_NAME is not defined. Connecting to the root MongoDB URI: %s",
      MONGO_URI
    );
  }

  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      logger.debug(
        "Attempting to connect to MongoDB (Attempt %d)",
        retries + 1
      );
      await mongoose.connect(fullMongoURI);
      logger.info("MongoDB connected successfully.");
      return;
    } catch (err) {
      retries += 1;
      logger.error("MongoDB connection failed (Attempt %d): %o", retries, err);

      if (retries >= MAX_RETRIES) {
        logger.error("Exceeded maximum retry attempts. Exiting...");
        throw err;
      }

      logger.info("Retrying connection in %d ms...", RETRY_DELAY);
      await new Promise((res) => setTimeout(res, RETRY_DELAY));
    }
  }
};

export default connectDB;
