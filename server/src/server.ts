import app from "./app";
import connectDB from "./config/db/db_connection";
import logger from "./config/logger";
import mongoose from "mongoose";
import env from "./config/env";
import { initializeDatabase } from "./utils/seed";

const PORT = env.PORT;

const startServer = async () => {
  try {
    await connectDB();
    await initializeDatabase();

    const server = app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });

    const gracefulShutdown = async (signal: string) => {
      logger.info(`Received signal: ${signal}. Closing server gracefully...`);
      server.close(async () => {
        logger.info("HTTP server closed.");
        await mongoose.connection.close();
        logger.info("MongoDB connection closed.");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

    process.on("unhandledRejection", (reason, promise) => {
      logger.error("Unhandled Rejection at: %o, reason: %o", promise, reason);
    });

    process.on("uncaughtException", (error) => {
      logger.error("Uncaught Exception: %o", error);
      process.exit(1);
    });
  } catch (error) {
    logger.error("Failed to start server: %o", error);
    process.exit(1);
  }
};

export default startServer;
