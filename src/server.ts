import app from "./app";
import { config } from "./config/env";
import { connectDatabase } from "./config/database";

const server = app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

connectDatabase().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown database error";
  console.error(`MongoDB connection failed: ${message}`);
});

const shutdown = () => {
  server.close(() => process.exit(0));
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
