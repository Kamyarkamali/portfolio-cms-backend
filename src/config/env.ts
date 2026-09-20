import "dotenv/config";

const port = Number(process.env.PORT ?? 5000);
const nodeEnv = process.env.NODE_ENV ?? "development";
const mongodbUri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/portfolio";
const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:3000";
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN ?? "1d";

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535");
}

if (!jwtSecret) {
  throw new Error("JWT_SECRET is required");
}

export const config = {
  port,
  nodeEnv,
  mongodbUri,
  corsOrigin,
  jwtSecret,
  jwtExpiresIn,
} as const;
